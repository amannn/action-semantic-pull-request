const ENUM_SPLIT_REGEX = /[,\s]\s*/;

module.exports = {
  parseEnum(input) {
    return input.split(ENUM_SPLIT_REGEX).map((part) => part.trim());
  },

  parseBoolean(input) {
    return JSON.parse(input.trim());
  }
};
