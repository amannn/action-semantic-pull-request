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
    'No release type found in pull request title "Fix bug".'
  );
});

it('throws for PR titles with an unknown type', async () => {
  await expect(validatePrTitle('foo: Bar')).rejects.toThrow(
    'Unknown release type "foo" found in pull request title "foo: Bar".'
  );
});

describe('defined scopes', () => {
  it('allows a missing scope by default', async () => {
    await validatePrTitle('fix: Bar');
  });

  it('allows all scopes by default', async () => {
    await validatePrTitle('fix(core): Bar');
  });

  it('allows a missing scope when custom scopes are defined', async () => {
    await validatePrTitle('fix: Bar', {scopes: ['foo']});
  });

  it('allows a matching scope', async () => {
    await validatePrTitle('fix(core): Bar', {scopes: ['core']});
  });

  it('throws when an unknown scope is detected', async () => {
    await expect(
      validatePrTitle('fix(core): Bar', {scopes: ['foo']})
    ).rejects.toThrow(
      'Unknown scope "core" found in pull request title "fix(core): Bar". Use one of the available scopes: foo.'
    );
  });

  describe('require scope', () => {
    it('passes when a scope is provided', async () => {
      await validatePrTitle('fix(core): Bar', {
        scopes: ['core'],
        requireScope: true
      });
    });

    it('throws when a scope is missing', async () => {
      await expect(
        validatePrTitle('fix: Bar', {
          scopes: ['foo', 'bar'],
          requireScope: true
        })
      ).rejects.toThrow(
        'No scope found in pull request title "fix: Bar". Use one of the available scopes: foo, bar.'
      );
    });
  });
});

describe('custom types', () => {
  it('allows PR titles with a supported type', async () => {
    const inputs = ['foo: Foobar', 'bar: Foobar', 'baz: Foobar'];
    const types = ['foo', 'bar', 'baz'];

    for (let index = 0; index < inputs.length; index++) {
      await validatePrTitle(inputs[index], {types});
    }
  });

  it('throws for PR titles with an unknown type', async () => {
    await expect(
      validatePrTitle('fix: Foobar', {types: ['foo', 'bar']})
    ).rejects.toThrow(
      'Unknown release type "fix" found in pull request title "fix: Foobar".'
    );
  });
});
