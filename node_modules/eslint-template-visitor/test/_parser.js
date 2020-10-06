
const { PARSER = 'babel-eslint' } = process.env;
const { parse } = require(PARSER);
console.info('Using parser', PARSER);
module.exports = { parse, PARSER };
