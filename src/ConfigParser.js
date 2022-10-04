const ENUM_SPLIT_REGEX = /[,\s]\s*/;
const ENUM_SPLIT_NEWLINES_REGEX = /\n/;

module.exports = {
  parseEnum(input, onlyNewlines) {
    let pattern = onlyNewlines ? ENUM_SPLIT_NEWLINES_REGEX : ENUM_SPLIT_REGEX;

    return input
      .split(pattern)
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  },

  parseBoolean(input) {
    return JSON.parse(input.trim());
  },

  parseString(input) {
    return input;
  }
};
