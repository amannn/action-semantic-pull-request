const {isUndefined} = require('lodash');
const parser = require('conventional-commits-parser').sync;
const filter = require('conventional-commits-filter');
const debug = require('debug')('semantic-release:commit-analyzer');
const loadParserConfig = require('./lib/load-parser-config');
const loadReleaseRules = require('./lib/load-release-rules');
const analyzeCommit = require('./lib/analyze-commit');
const compareReleaseTypes = require('./lib/compare-release-types');
const RELEASE_TYPES = require('./lib/default-release-types');
const DEFAULT_RELEASE_RULES = require('./lib/default-release-rules');

/**
 * Determine the type of release to create based on a list of commits.
 *
 * @param {Object} pluginConfig The plugin configuration.
 * @param {String} pluginConfig.preset conventional-changelog preset ('angular', 'atom', 'codemirror', 'ember', 'eslint', 'express', 'jquery', 'jscs', 'jshint')
 * @param {String} pluginConfig.config Requierable npm package with a custom conventional-changelog preset
 * @param {String|Array} pluginConfig.releaseRules A `String` to load an external module or an `Array` of rules.
 * @param {Object} pluginConfig.parserOpts Additional `conventional-changelog-parser` options that will overwrite ones loaded by `preset` or `config`.
 * @param {Object} context The semantic-release context.
 * @param {Array<Object>} context.commits The commits to analyze.
 * @param {String} context.cwd The current working directory.
 *
 * @returns {String|null} the type of release to create based on the list of commits or `null` if no release has to be done.
 */
async function analyzeCommits(pluginConfig, context) {
  const {commits, logger} = context;
  const releaseRules = loadReleaseRules(pluginConfig, context);
  const config = await loadParserConfig(pluginConfig, context);
  let releaseType = null;

  filter(
    commits
      .filter(({message, hash}) => {
        if (!message.trim()) {
          debug('Skip commit %s with empty message', hash);
          return false;
        }

        return true;
      })
      .map(({message, ...commitProps}) => ({rawMsg: message, message, ...commitProps, ...parser(message, config)}))
  ).every(({rawMsg, ...commit}) => {
    logger.log(`Analyzing commit: %s`, rawMsg);
    let commitReleaseType;

    // Determine release type based on custom releaseRules
    if (releaseRules) {
      debug('Analyzing with custom rules');
      commitReleaseType = analyzeCommit(releaseRules, commit);
    }

    // If no custom releaseRules or none matched the commit, try with default releaseRules
    if (isUndefined(commitReleaseType)) {
      debug('Analyzing with default rules');
      commitReleaseType = analyzeCommit(DEFAULT_RELEASE_RULES, commit);
    }

    if (commitReleaseType) {
      logger.log('The release type for the commit is %s', commitReleaseType);
    } else {
      logger.log('The commit should not trigger a release');
    }

    // Set releaseType if commit's release type is higher
    if (commitReleaseType && compareReleaseTypes(releaseType, commitReleaseType)) {
      releaseType = commitReleaseType;
    }

    // Break loop if releaseType is the highest
    if (releaseType === RELEASE_TYPES[0]) {
      return false;
    }

    return true;
  });
  logger.log('Analysis of %s commits complete: %s release', commits.length, releaseType || 'no');

  return releaseType;
}

module.exports = {analyzeCommits};
