const {isNil, castArray} = require('lodash');

module.exports = (
  {
    githubUrl,
    githubApiPathPrefix,
    proxy,
    assets,
    successComment,
    failTitle,
    failComment,
    labels,
    assignees,
    releasedLabels,
  },
  {env}
) => ({
  githubToken: env.GH_TOKEN || env.GITHUB_TOKEN,
  githubUrl: githubUrl || env.GH_URL || env.GITHUB_URL,
  githubApiPathPrefix: githubApiPathPrefix || env.GH_PREFIX || env.GITHUB_PREFIX || '',
  proxy: proxy || env.HTTP_PROXY,
  assets: assets ? castArray(assets) : assets,
  successComment,
  failTitle: isNil(failTitle) ? 'The automated release is failing 🚨' : failTitle,
  failComment,
  labels: isNil(labels) ? ['semantic-release'] : labels === false ? false : castArray(labels),
  assignees: assignees ? castArray(assignees) : assignees,
  releasedLabels: isNil(releasedLabels) ? ['released'] : releasedLabels === false ? false : castArray(releasedLabels),
});
