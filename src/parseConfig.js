const ConfigParser = require('./ConfigParser');

module.exports = function parseConfig() {
  let types;
  if (process.env.INPUT_TYPES) {
    types = ConfigParser.parseEnum(types);
  }

  let scopes;
  if (process.env.INPUT_SCOPES) {
    scopes = ConfigParser.parseEnum(scopes);
  }

  let requireScope;
  if (process.env.INPUT_REQUIRE_SCOPE) {
    requireScope = ConfigParser.parseBoolean(process.env.INPUT_REQUIRE_SCOPE);
  }

  return {types, scopes, requireScope};
};
