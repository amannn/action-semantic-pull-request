const ConfigParser = require('./ConfigParser');

describe('parseEnum', () => {
  it('parses commas', () => {
    expect(ConfigParser.parseEnum('one, two,three,  \nfour  ', false)).toEqual([
      'one',
      'two',
      'three',
      'four'
    ]);
  });

  it('parses white space', () => {
    expect(ConfigParser.parseEnum('one two\nthree  \n\rfour', false)).toEqual([
      'one',
      'two',
      'three',
      'four'
    ]);
  });

  it('allows only newlines', () => {
    expect(ConfigParser.parseEnum('one two\nthree  \n\rfour', true)).toEqual([
      'one two',
      'three',
      'four'
    ]);
  });
});
