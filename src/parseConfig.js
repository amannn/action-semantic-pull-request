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
  if (process.env.INPUT_REQUIRE_SCOPE) {
    requireScope = ConfigParser.parseBoolean(process.env.INPUT_REQUIRE_SCOPE);
  }

  return {types, scopes, requireScope};
};
