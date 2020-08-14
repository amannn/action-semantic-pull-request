const path = require('path');
const execa = require('execa');
const getRegistry = require('./get-registry');
const getReleaseInfo = require('./get-release-info');

module.exports = async (npmrc, {npmPublish, pkgRoot}, pkg, context) => {
  const {
    cwd,
    env,
    stdout,
    stderr,
    nextRelease: {version},
    logger,
  } = context;

  if (npmPublish !== false && pkg.private !== true) {
    const basePath = pkgRoot ? path.resolve(cwd, pkgRoot) : cwd;
    const registry = getRegistry(pkg, context);

    logger.log('Publishing version %s to npm registry', version);
    const result = execa('npm', ['publish', basePath, '--userconfig', npmrc, '--registry', registry], {cwd, env});
    result.stdout.pipe(stdout, {end: false});
    result.stderr.pipe(stderr, {end: false});
    await result;

    logger.log(`Published ${pkg.name}@${version} on ${registry}`);
    return getReleaseInfo(npmrc, pkg, context, registry);
  }

  logger.log(
    'Skip publishing to npm registry as %s is %s',
    ...(npmPublish === false ? ['npmPublish', false] : ["package.json's private property", true])
  );

  return false;
};
