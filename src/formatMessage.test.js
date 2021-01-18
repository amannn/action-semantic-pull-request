const formatMessage = require('./formatMessage');

it('handles a string without variables', () => {
  const message = 'this is test';
  expect(formatMessage(message)).toEqual(message);
});

it('replaces a variable', () => {
  expect(
    formatMessage('this is {subject} test', {subject: 'my subject'})
  ).toEqual('this is my subject test');
});

it('replaces multiple variables', () => {
  expect(
    formatMessage('this {title} is {subject} test', {
      subject: 'my subject',
      title: 'my title'
    })
  ).toEqual('this my title is my subject test');
});

it('replaces multiple instances of a variable', () => {
  expect(
    formatMessage(
      '99 bottles of {beverage} on the wall, 99 bottles of {beverage}.',
      {beverage: 'beer'}
    )
  ).toEqual('99 bottles of beer on the wall, 99 bottles of beer.');
});
