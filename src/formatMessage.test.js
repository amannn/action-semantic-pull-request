const formatMessage = require('./formatMessage');

describe('parse pattern error', () => {
  it('parse string without changes if template values not provided', () => {
    const customError = 'this is test';
    expect(formatMessage(customError)).toEqual(customError);
  });

  it('parses string properly by replacing one template value', () => {
    expect(
      formatMessage('this is {subject} test', {subject: 'my subject'})
    ).toEqual('this is my subject test');
  });

  it('parses string properly by replacing both template values', () => {
    expect(
      formatMessage('this {title} is {subject} test', {
        subject: 'my subject',
        title: 'my title'
      })
    ).toEqual('this my title is my subject test');
  });
});
