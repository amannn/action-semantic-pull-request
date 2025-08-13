import {describe, expect, it} from 'vitest';
import ConfigParser from './ConfigParser.js';

describe('parseEnum', () => {
  it('parses newline-delimited lists, trimming whitespace', () => {
    expect(ConfigParser.parseEnum('one   \ntwo   \nthree  \r\nfour')).toEqual([
      'one',
      'two',
      'three',
      'four'
    ]);
  });
  it('parses newline-delimited lists, including regex, trimming whitespace', () => {
    expect(
      ConfigParser.parseEnum('one   \ntwo   \n^[A-Z]+\\n$  \r\nfour')
    ).toEqual(['one', 'two', '^[A-Z]+\\n$', 'four']);
  });
});
