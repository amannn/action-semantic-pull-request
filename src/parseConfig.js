const ConfigParser = require('./ConfigParser');

module.exports = function parseConfig() {
  let types;
  if (process.env.INPUT_TYPES) {
    types = ConfigParser.parseEnum(process.env.INPUT_TYPES);
  }

  let scopes;
  if (process.env.INPUT_SCOPES) {
    scopes = ConfigParser.parseEnum(process.env.INPUT_SCOPES);
  }

  let requireScope;
  if (process.env.INPUT_REQUIRESCOPE) {
    requireScope = ConfigParser.parseBoolean(process.env.INPUT_REQUIRESCOPE);
  }

  let disallowScopes;
  if (process.env.INPUT_DISALLOWSCOPES) {
    disallowScopes = ConfigParser.parseEnum(process.env.INPUT_DISALLOWSCOPES);
  }

  let subjectPattern;
  if (process.env.INPUT_SUBJECTPATTERN) {
    subjectPattern = ConfigParser.parseString(process.env.INPUT_SUBJECTPATTERN);
  }

  let subjectPatternError;
  if (process.env.INPUT_SUBJECTPATTERNERROR) {
    subjectPatternError = ConfigParser.parseString(
      process.env.INPUT_SUBJECTPATTERNERROR
    );
  }

  let headerPattern;
  if (process.env.INPUT_HEADERPATTERN) {
    headerPattern = ConfigParser.parseString(process.env.INPUT_HEADERPATTERN);
  }

  let headerPatternCorrespondence;
  if (process.env.INPUT_HEADERPATTERNCORRESPONDENCE) {
    headerPatternCorrespondence = ConfigParser.parseString(
      process.env.INPUT_HEADERPATTERNCORRESPONDENCE
    );
  }

  let wip;
  if (process.env.INPUT_WIP) {
    wip = ConfigParser.parseBoolean(process.env.INPUT_WIP);
  }

  let validateSingleCommit;
  if (process.env.INPUT_VALIDATESINGLECOMMIT) {
    validateSingleCommit = ConfigParser.parseBoolean(
      process.env.INPUT_VALIDATESINGLECOMMIT
    );
  }

  let validateSingleCommitMatchesPrTitle;
  if (process.env.INPUT_VALIDATESINGLECOMMITMATCHESPRTITLE) {
    validateSingleCommitMatchesPrTitle = ConfigParser.parseBoolean(
      process.env.INPUT_VALIDATESINGLECOMMITMATCHESPRTITLE
    );
  }

  let githubBaseUrl;
  if (process.env.INPUT_GITHUBBASEURL) {
    githubBaseUrl = ConfigParser.parseString(process.env.INPUT_GITHUBBASEURL);
  }

  let ignoreLabels;
  if (process.env.INPUT_IGNORELABELS) {
    ignoreLabels = ConfigParser.parseEnum(process.env.INPUT_IGNORELABELS);
  }

  return {
    types,
    scopes,
    requireScope,
    disallowScopes,
    wip,
    subjectPattern,
    subjectPatternError,
    headerPattern,
    headerPatternCorrespondence,
    validateSingleCommit,
    validateSingleCommitMatchesPrTitle,
    githubBaseUrl,
    ignoreLabels
  };
};
