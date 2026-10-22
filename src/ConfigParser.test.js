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

describe('parseNumber', () => {
  it('parses a positive integer, trimming whitespace', () => {
    expect(ConfigParser.parseNumber(' 42 ')).toBe(42);
  });
  it('rejects values that are not positive integers', () => {
    for (const input of ['', 'abc', '0', '-1', '1.5']) {
      expect(() => ConfigParser.parseNumber(input)).toThrow(
        'Expected a positive integer'
      );
    }
  });
});
