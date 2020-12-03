const path = require('path');
const {stat, readFile} = require('fs-extra');
const {isPlainObject, template} = require('lodash');
const mime = require('mime');
const debug = require('debug')('semantic-release:github');
const {RELEASE_NAME} = require('./definitions/constants');
const parseGithubUrl = require('./parse-github-url');
const globAssets = require('./glob-assets.js');
const resolveConfig = require('./resolve-config');
const getClient = require('./get-client');
const isPrerelease = require('./is-prerelease');

module.exports = async (pluginConfig, context) => {
  const {
    cwd,
    options: {repositoryUrl},
    branch,
    nextRelease: {name, gitTag, notes},
    logger,
  } = context;
  const {githubToken, githubUrl, githubApiPathPrefix, proxy, assets} = resolveConfig(pluginConfig, context);
  const {owner, repo} = parseGithubUrl(repositoryUrl);
  const github = getClient({githubToken, githubUrl, githubApiPathPrefix, proxy});
  const release = {
    owner,
    repo,
    tag_name: gitTag,
    target_commitish: branch.name,
    name,
    body: notes,
    prerelease: isPrerelease(branch),
  };

  debug('release object: %O', release);

  // When there are no assets, we publish a release directly
  if (!assets || assets.length === 0) {
    const {
      data: {html_url: url, id: releaseId},
    } = await github.repos.createRelease(release);

    logger.log('Published GitHub release: %s', url);
    return {url, name: RELEASE_NAME, id: releaseId};
  }

  // We'll create a draft release, append the assets to it, and then publish it.
  // This is so that the assets are available when we get a Github release event.
  const draftRelease = {...release, draft: true};

  const {
    data: {upload_url: uploadUrl, id: releaseId},
  } = await github.repos.createRelease(draftRelease);

  // Append assets to the release
  const globbedAssets = await globAssets(context, assets);
  debug('globed assets: %o', globbedAssets);

  await Promise.all(
    globbedAssets.map(async (asset) => {
      const filePath = isPlainObject(asset) ? asset.path : asset;
      let file;

      try {
        file = await stat(path.resolve(cwd, filePath));
      } catch {
        logger.error('The asset %s cannot be read, and will be ignored.', filePath);
        return;
      }

      if (!file || !file.isFile()) {
        logger.error('The asset %s is not a file, and will be ignored.', filePath);
        return;
      }

      const fileName = template(asset.name || path.basename(filePath))(context);
      const upload = {
        url: uploadUrl,
        data: await readFile(path.resolve(cwd, filePath)),
        name: fileName,
        headers: {
          'content-type': mime.getType(path.extname(fileName)) || 'text/plain',
          'content-length': file.size,
        },
      };

      debug('file path: %o', filePath);
      debug('file name: %o', fileName);

      if (isPlainObject(asset) && asset.label) {
        upload.label = template(asset.label)(context);
      }

      const {
        data: {browser_download_url: downloadUrl},
      } = await github.repos.uploadReleaseAsset(upload);
      logger.log('Published file %s', downloadUrl);
    })
  );

  const {
    data: {html_url: url},
  } = await github.repos.updateRelease({owner, repo, release_id: releaseId, draft: false});

  logger.log('Published GitHub release: %s', url);
  return {url, name: RELEASE_NAME, id: releaseId};
};
