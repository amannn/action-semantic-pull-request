const {isMatchWith, isString} = require('lodash');
const micromatch = require('micromatch');
const debug = require('debug')('semantic-release:commit-analyzer');
const RELEASE_TYPES = require('./default-release-types');
const compareReleaseTypes = require('./compare-release-types');

/**
 * Find all the rules matching and return the highest release type of the matching rules.
 *
 * @param {Array} releaseRules the rules to match the commit against.
 * @param {Commit} commit a parsed commit.
 * @return {string} the highest release type of the matching rules or `undefined` if no rule match the commit.
 */
module.exports = (releaseRules, commit) => {
  let releaseType;

  releaseRules
    .filter(
      ({breaking, revert, release, ...rule}) =>
        // If the rule is not `breaking` or the commit doesn't have a breaking change note
        (!breaking || (commit.notes && commit.notes.length > 0)) &&
        // If the rule is not `revert` or the commit is not a revert
        (!revert || commit.revert) &&
        // Otherwise match the regular rules
        isMatchWith(commit, rule, (obj, src) =>
          isString(src) && isString(obj) ? micromatch.isMatch(obj, src) : undefined
        )
    )
    .every(match => {
      if (compareReleaseTypes(releaseType, match.release)) {
        releaseType = match.release;
        debug('The rule %o match commit with release type %o', match, releaseType);
        if (releaseType === RELEASE_TYPES[0]) {
          debug('Release type %o is the highest possible. Stop analysis.', releaseType);
          return false;
        }
      } else {
        debug(
          'The rule %o match commit with release type %o but the higher release type %o has already been found for this commit',
          match,
          match.release,
          releaseType
        );
      }

      return true;
    });

  return releaseType;
};
