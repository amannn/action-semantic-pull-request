const ENUM_SPLIT_REGEX = /\n/;

export default {
  parseEnum(input) {
    return input
      .split(ENUM_SPLIT_REGEX)
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
