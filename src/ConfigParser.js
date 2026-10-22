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
  },

  parseNumber(input) {
    const number = Number(input.trim());
    if (!Number.isInteger(number) || number <= 0) {
      throw new Error(`Expected a positive integer, got "${input}".`);
    }
    return number;
  }
};
