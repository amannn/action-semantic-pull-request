const {template} = require('lodash');
const debug = require('debug')('semantic-release:git');
const resolveConfig = require('./resolve-config');
const globAssets = require('./glob-assets.js');
const {filterModifiedFiles, add, commit, push} = require('./git');

/**
 * Prepare a release commit including configurable files.
 *
 * @param {Object} pluginConfig The plugin configuration.
 * @param {String|Array<String>} [pluginConfig.assets] Files to include in the release commit. Can be files path or globs.
 * @param {String} [pluginConfig.message] The message for the release commit.
 * @param {Object} context semantic-release context.
 * @param {Object} context.options `semantic-release` configuration.
 * @param {Object} context.lastRelease The last release.
 * @param {Object} context.nextRelease The next release.
 * @param {Object} logger Global logger.
 */
module.exports = async (pluginConfig, context) => {
  const {
    env,
    cwd,
    options: {branch, repositoryUrl},
    lastRelease,
    nextRelease,
    logger,
  } = context;
  const {message, assets} = resolveConfig(pluginConfig, logger);

  if (assets && assets.length > 0) {
    const globbedAssets = await globAssets(context, assets);
    debug('globed assets: %o', globbedAssets);

    const filesToCommit = await filterModifiedFiles(globbedAssets, {cwd, env});

    if (filesToCommit.length > 0) {
      logger.log('Found %d file(s) to commit', filesToCommit.length);
      await add(filesToCommit, {env, cwd});
      debug('commited files: %o', filesToCommit);
      await commit(
        message
          ? template(message)({branch, lastRelease, nextRelease})
          : `chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}`,
        {env, cwd}
      );
    }

    await push(repositoryUrl, branch, {env, cwd});
    logger.log('Prepared Git release: %s', nextRelease.gitTag);
  }
};
