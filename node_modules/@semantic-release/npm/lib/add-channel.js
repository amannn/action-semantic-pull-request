const execa = require('execa');
const getRegistry = require('./get-registry');
const getChannel = require('./get-channel');
const getReleaseInfo = require('./get-release-info');

module.exports = async (npmrc, {npmPublish}, pkg, context) => {
  const {
    cwd,
    env,
    stdout,
    stderr,
    nextRelease: {version, channel},
    logger,
  } = context;

  if (npmPublish !== false && pkg.private !== true) {
    const registry = getRegistry(pkg, context);
    const distTag = getChannel(channel);

    logger.log(`Adding version ${version} to npm registry on dist-tag ${distTag}`);
    const result = execa(
      'npm',
      ['dist-tag', 'add', `${pkg.name}@${version}`, distTag, '--userconfig', npmrc, '--registry', registry],
      {
        cwd,
        env,
      }
    );
    result.stdout.pipe(stdout, {end: false});
    result.stderr.pipe(stderr, {end: false});
    await result;

    logger.log(`Added ${pkg.name}@${version} to dist-tag @${distTag} on ${registry}`);

    return getReleaseInfo(pkg, context, distTag, registry);
  }

  logger.log(
    `Skip adding to npm channel as ${npmPublish === false ? 'npmPublish' : "package.json's private property"} is ${
      npmPublish !== false
    }`
  );

  return false;
};
