const normalizeUrl = require('normalize-url');

module.exports = (
  {name},
  {env: {DEFAULT_NPM_REGISTRY = 'https://registry.npmjs.org/'}, nextRelease: {version}},
  distTag,
  registry
) => ({
  name: `npm package (@${distTag} dist-tag)`,
  url:
    normalizeUrl(registry) === normalizeUrl(DEFAULT_NPM_REGISTRY)
      ? `https://www.npmjs.com/package/${name}/v/${version}`
      : undefined,
  channel: distTag,
});
