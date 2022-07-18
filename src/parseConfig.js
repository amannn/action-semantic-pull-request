const {readFileSync} = require('fs');
const ConfigParser = require('./ConfigParser');

module.exports = function parseConfig() {
  let config = {};
  try {
    config = JSON.parse(
      readFileSync('.github/semantic.json', {encoding: 'utf8'})
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        'The semantic.json file is not valid JSON. Please fix the syntax errors: ' +
          error.message
      );
    }
    // skipping if the file doesn't exist
  }

  if (process.env.INPUT_TYPES) {
    config.types = [
      ...config.types,
      ...ConfigParser.parseEnum(process.env.INPUT_TYPES)
    ];
  }

  if (process.env.INPUT_SCOPES) {
    config.scopes = [
      ...config.scopes,
      ...ConfigParser.parseEnum(process.env.INPUT_SCOPES)
    ];
  }

  if (process.env.INPUT_REQUIRESCOPE) {
    config.requireScope = ConfigParser.parseBoolean(
      process.env.INPUT_REQUIRESCOPE
    );
  }

  if (process.env.INPUT_DISALLOWSCOPES) {
    config.disallowScopes = [
      ...config.disallowScopes,
      ...ConfigParser.parseEnum(process.env.INPUT_DISALLOWSCOPES)
    ];
  }

  if (process.env.INPUT_SUBJECTPATTERN) {
    config.subjectPattern = ConfigParser.parseString(
      process.env.INPUT_SUBJECTPATTERN
    );
  }

  if (process.env.INPUT_SUBJECTPATTERNERROR) {
    config.subjectPatternError = ConfigParser.parseString(
      process.env.INPUT_SUBJECTPATTERNERROR
    );
  }

  if (process.env.INPUT_HEADERPATTERN) {
    config.headerPattern = ConfigParser.parseString(
      process.env.INPUT_HEADERPATTERN
    );
  }

  if (process.env.INPUT_HEADERPATTERNCORRESPONDENCE) {
    config.headerPatternCorrespondence = ConfigParser.parseString(
      process.env.INPUT_HEADERPATTERNCORRESPONDENCE
    );
  }

  if (process.env.INPUT_WIP) {
    config.wip = ConfigParser.parseBoolean(process.env.INPUT_WIP);
  }

  if (process.env.INPUT_VALIDATESINGLECOMMIT) {
    config.validateSingleCommit = ConfigParser.parseBoolean(
      process.env.INPUT_VALIDATESINGLECOMMIT
    );
  }

  if (process.env.INPUT_VALIDATESINGLECOMMITMATCHESPRTITLE) {
    config.validateSingleCommitMatchesPrTitle = ConfigParser.parseBoolean(
      process.env.INPUT_VALIDATESINGLECOMMITMATCHESPRTITLE
    );
  }

  if (process.env.INPUT_GITHUBBASEURL) {
    config.githubBaseUrl = ConfigParser.parseString(
      process.env.INPUT_GITHUBBASEURL
    );
  }

  if (process.env.INPUT_IGNORELABELS) {
    config.ignoreLabels = ConfigParser.parseEnum(
      process.env.INPUT_IGNORELABELS
    );
  }

  return config;
};
