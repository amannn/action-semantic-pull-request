const ConfigParser = require('./ConfigParser');

describe('parseEnum', () => {
  it('parses newline-delimited lists, trimming whitespace', () => {
    expect(ConfigParser.parseEnum('one   \ntwo   \nthree  \n\rfour')).toEqual([
      'one',
      'two',
      'three',
      'four'
    ]);
  });
});
