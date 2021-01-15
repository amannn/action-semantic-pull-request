const subjectPatternErrorParser = require('./SubjectPatternErrorParser');

describe('parse pattern error', () => {
  it('parse string without changes if template values not provided', () => {
    const customError = 'this is test';
    expect(subjectPatternErrorParser(customError)).toEqual(customError);
  });

  it('parses string properly by replacing one template value', () => {
    expect(
      subjectPatternErrorParser('this is ${subject} test', 'my subject')
    ).toEqual('this is my subject test');
  });

  it('parses string properly by replacing both template values', () => {
    expect(
      subjectPatternErrorParser(
        'this ${title} is ${subject} test',
        'my subject',
        'my title'
      )
    ).toEqual('this my title is my subject test');
  });
});
