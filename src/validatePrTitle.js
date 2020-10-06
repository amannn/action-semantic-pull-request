const conventionalCommitsConfig = require('conventional-changelog-conventionalcommits');
const conventionalCommitTypes = require('conventional-commit-types');
const parser = require('conventional-commits-parser').sync;

module.exports = async function validatePrTitle(prTitle) {
  const {parserOpts} = await conventionalCommitsConfig();
  const result = parser(prTitle, parserOpts);

  if (!result.type) {
    throw new Error(
      `No release type found in pull request title "${prTitle}".` +
        '\n\nAdd a prefix like "fix: ", "feat: " or "feat!: " to indicate what kind of release this pull request corresponds to. The title should match the commit message format as specified by https://www.conventionalcommits.org/.'
    );
  }

  const allowedTypes = Object.keys(conventionalCommitTypes.types);
  if (!allowedTypes.includes(result.type)) {
    throw new Error(
      `Unknown release type "${result.type}" found in pull request title "${prTitle}".` +
        `\n\nPlease use one of these recognized types: ${allowedTypes.join(
          ', '
        )}.`
    );
  }
};
