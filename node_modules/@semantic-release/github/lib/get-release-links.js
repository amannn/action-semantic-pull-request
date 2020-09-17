const {RELEASE_NAME} = require('./definitions/constants');

const linkify = (releaseInfo) =>
  `${
    releaseInfo.url
      ? releaseInfo.url.startsWith('http')
        ? `[${releaseInfo.name}](${releaseInfo.url})`
        : `${releaseInfo.name}: \`${releaseInfo.url}\``
      : `\`${releaseInfo.name}\``
  }`;

const filterReleases = (releaseInfos) =>
  releaseInfos.filter((releaseInfo) => releaseInfo.name && releaseInfo.name !== RELEASE_NAME);

module.exports = (releaseInfos) =>
  `${
    filterReleases(releaseInfos).length > 0
      ? `This release is also available on:\n${filterReleases(releaseInfos)
          .map((releaseInfo) => `- ${linkify(releaseInfo)}`)
          .join('\n')}`
      : ''
  }`;
