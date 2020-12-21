const conventionalCommitsConfig = require('conventional-changelog-conventionalcommits');
const conventionalCommitTypes = require('conventional-commit-types');
const parser = require('conventional-commits-parser').sync;

const defaultTypes = Object.keys(conventionalCommitTypes.types);

module.exports = async function validatePrTitle(
  prTitle,
  {types, scopes, requireScope} = {}
) {
  if (!types) types = defaultTypes;

  const {parserOpts} = await conventionalCommitsConfig();
  const result = parser(prTitle, parserOpts);

  function printAvailableTypes() {
    return `Available types:\n${types
      .map((type) => {
        let bullet = ` - ${type}`;

        if (types === defaultTypes) {
          bullet += `: ${conventionalCommitTypes.types[type].description}`;
        }

        return bullet;
      })
      .join('\n')}`;
  }

  if (!result.type) {
    throw new Error(
      `No release type found in pull request title "${prTitle}". Add a prefix to indicate what kind of release this pull request corresponds to (see https://www.conventionalcommits.org/).\n\n${printAvailableTypes()}`
    );
  }

  if (!types.includes(result.type)) {
    throw new Error(
      `Unknown release type "${
        result.type
      }" found in pull request title "${prTitle}". \n\n${printAvailableTypes()}`
    );
  }

  if (requireScope && !result.scope) {
    throw new Error(
      `No scope found in pull request title "${prTitle}". Use one of the available scopes: ${scopes.join(
        ', '
      )}.`
    );
  }

  if (scopes && result.scope && !scopes.includes(result.scope)) {
    throw new Error(
      `Unknown scope "${
        result.scope
      }" found in pull request title "${prTitle}". Use one of the available scopes: ${scopes.join(
        ', '
      )}.`
    );
  }
};
