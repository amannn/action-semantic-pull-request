const validatePrTitle = require('./validatePrTitle');

it('detects valid PR titles', async () => {
  const inputs = [
    'fix: Fix bug',
    'fix!: Fix bug',
    'feat: Add feature',
    'feat!: Add feature',
    'refactor: Internal cleanup'
  ];

  for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];
    await validatePrTitle(input);
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
  it('detects valid PR titles', async () => {
    const inputs = ['foo: Foobar', 'bar: Foobar', 'baz: Foobar'];

    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      const types = ['foo', 'bar', 'baz'];
      await validatePrTitle(input, types);
    }
  });

  it('throws for PR titles with an unknown type with custom types', async () => {
    await expect(
      validatePrTitle('fix: Foobar', ['foo', 'bar'])
    ).rejects.toThrow(
      /Unknown release type "fix" found in pull request title "fix: Foobar"./
    );
  });
});
