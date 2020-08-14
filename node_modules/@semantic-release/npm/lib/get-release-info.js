const execa = require('execa');
const normalizeUrl = require('normalize-url');

module.exports = async (
  npmrc,
  {name, publishConfig: {tag} = {}},
  {cwd, env: {DEFAULT_NPM_REGISTRY = 'https://registry.npmjs.org/', ...env}, nextRelease: {version}},
  registry
) => {
  const distTag =
    tag || (await execa('npm', ['config', 'get', 'tag', '--userconfig', npmrc], {cwd, env})).stdout || 'latest';

  return {
    name: `npm package (@${distTag} dist-tag)`,
    url:
      normalizeUrl(registry) === normalizeUrl(DEFAULT_NPM_REGISTRY)
        ? `https://www.npmjs.com/package/${name}/v/${version}`
        : undefined,
  };
};
