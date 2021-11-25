const ConfigParser = require('./ConfigParser');

describe('parseEnum', () => {
  it('parses commas', () => {
    expect(ConfigParser.parseEnum('one, two,three,  \nfour  ')).toEqual([
      'one',
      'two',
      'three',
      'four'
    ]);
  });

  it('parses white space', () => {
    expect(ConfigParser.parseEnum('one two\nthree  \n\rfour')).toEqual([
      'one',
      'two',
      'three',
      'four'
    ]);
  });
});
