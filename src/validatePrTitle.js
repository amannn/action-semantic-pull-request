import core from '@actions/core';
// eslint-disable-next-line import/no-unresolved -- False positive
import conventionalCommitsConfig from 'conventional-changelog-conventionalcommits';
import conventionalCommitTypes from 'conventional-commit-types';
// eslint-disable-next-line import/no-unresolved -- False positive
import {CommitParser} from 'conventional-commits-parser';
import formatMessage from './formatMessage.js';

const defaultTypes = Object.keys(conventionalCommitTypes.types);

export default async function validatePrTitle(
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

  const {parser: parserOpts} = await conventionalCommitsConfig();
  if (headerPattern) {
    parserOpts.headerPattern = headerPattern;
  }
  if (headerPatternCorrespondence) {
    parserOpts.headerCorrespondence = headerPatternCorrespondence;
  }
  const result = new CommitParser(parserOpts).parse(prTitle);

  core.setOutput('type', result.type);
  core.setOutput('scope', result.scope);
  core.setOutput('subject', result.subject);

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
    return scopes && !scopes.some((scope) => new RegExp(`^${scope}$`).test(s));
  }

  function isDisallowedScope(s) {
    return (
      disallowScopes &&
      disallowScopes.some((scope) => new RegExp(`^${scope}$`).test(s))
    );
  }

  if (!result.type) {
    raiseError(
      `No release type found in pull request title "${prTitle}". Add a prefix to indicate what kind of release this pull request corresponds to. For reference, see https://www.conventionalcommits.org/\n\n${printAvailableTypes()}`
    );
  }

  if (!result.subject) {
    raiseError(`No subject found in pull request title "${prTitle}".`);
  }

  if (!types.includes(result.type)) {
    raiseError(
      `Unknown release type "${
        result.type
      }" found in pull request title "${prTitle}". \n\n${printAvailableTypes()}`
    );
  }

  if (requireScope && !result.scope) {
    let message = `No scope found in pull request title "${prTitle}".`;
    if (scopes) {
      message += ` Scope must match one of: ${scopes.join(', ')}.`;
    }
    raiseError(message);
  }

  const givenScopes = result.scope
    ? result.scope.split(',').map((scope) => scope.trim())
    : undefined;

  const unknownScopes = givenScopes ? givenScopes.filter(isUnknownScope) : [];
  if (scopes && unknownScopes.length > 0) {
    raiseError(
      `Unknown ${
        unknownScopes.length > 1 ? 'scopes' : 'scope'
      } "${unknownScopes.join(
        ','
      )}" found in pull request title "${prTitle}". Scope must match one of: ${scopes.join(
        ', '
      )}.`
    );
  }

  const disallowedScopes = givenScopes
    ? givenScopes.filter(isDisallowedScope)
    : [];
  if (disallowScopes && disallowedScopes.length > 0) {
    raiseError(
      `Disallowed ${
        disallowedScopes.length === 1 ? 'scope was' : 'scopes were'
      } found: ${disallowedScopes.join(', ')}`
    );
  }

  function throwSubjectPatternError(message) {
    if (subjectPatternError) {
      message = formatMessage(subjectPatternError, {
        subject: result.subject,
        title: prTitle
      });
    }
    raiseError(message);
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

  function raiseError(message) {
    core.setOutput('error_message', message);

    throw new Error(message);
  }
}
