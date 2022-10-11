const ConfigParser = require('./ConfigParser');

describe('parseEnum', () => {
  it('parses newline-delimited lists, trimming whitespace', () => {
    expect(ConfigParser.parseEnum('one   \ntwo   \nthree  \r\nfour')).toEqual([
      'one',
      'two',
      'three',
      'four'
    ]);
  });
});
