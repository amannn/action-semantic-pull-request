const conventionalCommitsConfig = require('conventional-changelog-conventionalcommits');
const conventionalCommitTypes = require('conventional-commit-types');
const parser = require('conventional-commits-parser').sync;

module.exports = async function validatePrTitle(
  prTitle,
  types = Object.keys(conventionalCommitTypes.types)
) {
  const {parserOpts} = await conventionalCommitsConfig();
  const result = parser(prTitle, parserOpts);

  if (!result.type) {
    throw new Error(
      `No release type found in pull request title "${prTitle}". Add a prefix to indicate what kind of release this pull request corresponds to (see https://www.conventionalcommits.org/).\n\nAvailable types:\n${types
        .map((type) => ` - ${type}`)
        .join('\n')}`
    );
  }

  if (!types.includes(result.type)) {
    throw new Error(
      `Unknown release type "${
        result.type
      }" found in pull request title "${prTitle}". \n\nAvailable types:\n${types
        .map((type) => ` - ${type}`)
        .join('\n')}`
    );
  }
};
