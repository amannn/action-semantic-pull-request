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

  return {
    types,
    scopes,
    requireScope,
    wip,
    subjectPattern,
    subjectPatternError,
    validateSingleCommit
  };
};
