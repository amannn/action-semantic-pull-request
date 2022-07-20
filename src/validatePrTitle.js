const core = require('@actions/core');
const conventionalCommitsConfig = require('conventional-changelog-conventionalcommits');
const conventionalCommitTypes = require('conventional-commit-types');
const parser = require('conventional-commits-parser').sync;
const formatMessage = require('./formatMessage');

const defaultTypes = Object.keys(conventionalCommitTypes.types);

let errorMessage

module.exports = async function validatePrTitle(
  prTitle,
  {
    types,
    scopes,
    requireScope,
    disallowScopes,
    subjectPattern,
    subjectPatternError,
    headerPattern,
    headerPatternCorrespondence
  } = {}
) {
  if (!types) types = defaultTypes;

  const {parserOpts} = await conventionalCommitsConfig();
  if (headerPattern) {
    parserOpts.headerPattern = headerPattern;
  }
  if (headerPatternCorrespondence) {
    parserOpts.headerCorrespondence = headerPatternCorrespondence;
  }
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

  function isUnknownScope(s) {
    return scopes && !scopes.includes(s);
  }

  function isDisallowedScope(s) {
    return disallowScopes && disallowScopes.includes(s);
  }

  if (!result.type) {
    errorMessage = `No release type found in pull request title "${prTitle}". Add a prefix to indicate what kind of release this pull request corresponds to. For reference, see https://www.conventionalcommits.org/\n\n${printAvailableTypes()}`;
    throw new Error(errorMessage);
  }

  if (!result.subject) {
    errorMessage = `No subject found in pull request title "${prTitle}".`;
    throw new Error(errorMessage);
  }

  if (!types.includes(result.type)) {    
    errorMessage = `Unknown release type "${result.type}" found in pull request title "${prTitle}". \n\n${printAvailableTypes()}`;
    throw new Error(errorMessage);
  }

  if (requireScope && !result.scope) {
    errorMessage = `No scope found in pull request title "${prTitle}".`;
    if (scopes) {
      errorMessage += ` Use one of the available scopes: ${scopes.join(', ')}.`;
    }
    throw new Error(errorMessage);
  }

  const givenScopes = result.scope
    ? result.scope.split(',').map((scope) => scope.trim())
    : undefined;

  const unknownScopes = givenScopes ? givenScopes.filter(isUnknownScope) : [];
  if (scopes && unknownScopes.length > 0) {
    errorMessage = `Unknown ${unknownScopes.length > 1 ? 'scopes' : 'scope'} "${unknownScopes.join(',')}" found in pull request title "${prTitle}". Use one of the available scopes: ${scopes.join(', ')}.`;
    throw new Error(errorMessage);
  }

  const disallowedScopes = givenScopes
    ? givenScopes.filter(isDisallowedScope)
    : [];
  if (disallowScopes && disallowedScopes.length > 0) {
    errorMessage = `Disallowed ${disallowedScopes.length === 1 ? 'scope was' : 'scopes were'} found: ${disallowScopes.join(', ')}`;
    throw new Error(errorMessage);
  }

  function throwSubjectPatternError(message) {
    if (subjectPatternError) {
      message = formatMessage(subjectPatternError, {
        subject: result.subject,
        title: prTitle
      });
    }

    errorMessage = message;

    throw new Error(message);
  }

  if (subjectPattern) {
    const match = result.subject.match(new RegExp(subjectPattern));

    if (!match) {
      throwSubjectPatternError(
        `The subject "${result.subject}" found in pull request title "${prTitle}" doesn't match the configured pattern "${subjectPattern}".`
      );
    }

    const matchedPart = match[0];
    if (matchedPart.length !== result.subject.length) {
      throwSubjectPatternError(
        `The subject "${result.subject}" found in pull request title "${prTitle}" isn't an exact match for the configured pattern "${subjectPattern}". Please provide a subject that matches the whole pattern exactly.`
      );
    }
  }

  core.setOutput("error_message", errorMessage)
};
