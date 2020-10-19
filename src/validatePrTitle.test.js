const validatePrTitle = require('./validatePrTitle');

it('allows valid PR titles that use the default types', async () => {
  const inputs = [
    'fix: Fix bug',
    'fix!: Fix bug',
    'feat: Add feature',
    'feat!: Add feature',
    'refactor: Internal cleanup'
  ];

  for (let index = 0; index < inputs.length; index++) {
    await validatePrTitle(inputs[index]);
  }
});

it('throws for PR titles without a type', async () => {
  await expect(validatePrTitle('Fix bug')).rejects.toThrow(
    /No release type found in pull request title "Fix bug"./
  );
});

it('throws for PR titles with an unknown type', async () => {
  await expect(validatePrTitle('foo: Bar')).rejects.toThrow(
    /Unknown release type "foo" found in pull request title "foo: Bar"./
  );
});

describe('custom types', () => {
  it('allows PR titles with a supported type', async () => {
    const inputs = ['foo: Foobar', 'bar: Foobar', 'baz: Foobar'];
    const types = ['foo', 'bar', 'baz'];

    for (let index = 0; index < inputs.length; index++) {
      await validatePrTitle(inputs[index], types);
    }
  });

  it('throws for PR titles with an unknown type', async () => {
    await expect(
      validatePrTitle('fix: Foobar', ['foo', 'bar'])
    ).rejects.toThrow(
      /Unknown release type "fix" found in pull request title "fix: Foobar"./
    );
  });
});
