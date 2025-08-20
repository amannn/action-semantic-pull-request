import {describe, expect, it} from 'vitest';
import validatePrTitle from './validatePrTitle.js';

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

it('throws for PR titles with only a type', async () => {
  await expect(validatePrTitle('fix:')).rejects.toThrow(
    'No release type found in pull request title "fix:".'
  );
});

it('throws for PR titles without a subject', async () => {
  await expect(validatePrTitle('fix: ')).rejects.toThrow(
    'No subject found in pull request title "fix: ".'
  );
});

it('throws for PR titles with an unknown type', async () => {
  await expect(validatePrTitle('foo: Bar')).rejects.toThrow(
    'Unknown release type "foo" found in pull request title "foo: Bar".'
  );
});

describe('regex types', () => {
  const headerPattern = /^([\w-]*)(?:\(([\w$.\-*/ ]*)\))?: (.*)$/;

  it('allows a regex matching type', async () => {
    await validatePrTitle('JIRA-123: Bar', {
      types: ['JIRA-\\d+'],
      headerPattern
    });
  });

  it('can be used for dynamic Jira keys', async () => {
    const inputs = ['JIRA-123', 'P-123', 'INT-31', 'CONF-0'];

    for (let index = 0; index < inputs.length; index++) {
      await validatePrTitle(`${inputs[index]}: did the thing`, {
        types: ['[A-Z]+-\\d+'],
        headerPattern
      });
    }
  });

  it('throws for PR titles without a type', async () => {
    await expect(
      validatePrTitle('Fix JIRA-123 bug', {
        types: ['JIRA-\\d+'],
        headerPattern
      })
    ).rejects.toThrow(
      'No release type found in pull request title "Fix JIRA-123 bug".'
    );
  });

  it('throws for PR titles with only a type', async () => {
    await expect(
      validatePrTitle('JIRA-123:', {
        types: ['JIRA-\\d+'],
        headerPattern
      })
    ).rejects.toThrow(
      'No release type found in pull request title "JIRA-123:".'
    );
  });

  it('throws for PR titles without a subject', async () => {
    await expect(
      validatePrTitle('JIRA-123: ', {
        types: ['JIRA-\\d+'],
        headerPattern
      })
    ).rejects.toThrow('No subject found in pull request title "JIRA-123: ".');
  });

  it('throws for PR titles that do not match the regex', async () => {
    await expect(
      validatePrTitle('CONF-123: ', {
        types: ['JIRA-\\d+'],
        headerPattern
      })
    ).rejects.toThrow('No subject found in pull request title "CONF-123: ".');
  });

  it('throws when an unknown type is detected for auto-wrapping regex', async () => {
    await expect(
      validatePrTitle('JIRA-123A: Bar', {
        types: ['JIRA-\\d+'],
        headerPattern
      })
    ).rejects.toThrow(
      'Unknown release type "JIRA-123A" found in pull request title "JIRA-123A: Bar".\n\nAvailable types:\n - JIRA-\\d+'
    );
  });

  it('allows scopes when using a regex for the type', async () => {
    await validatePrTitle('JIRA-123(core): Bar', {
      types: ['JIRA-\\d+'],
      headerPattern
    });
  });
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

  it('allows a regex matching scope', async () => {
    await validatePrTitle('fix(CORE): Bar', {scopes: ['[A-Z]+']});
  });

  it('allows multiple matching scopes', async () => {
    await validatePrTitle('fix(core,e2e): Bar', {
      scopes: ['core', 'e2e', 'web']
    });
  });

  it('allows multiple regex matching scopes', async () => {
    await validatePrTitle('fix(CORE,WEB): Bar', {
      scopes: ['[A-Z]+']
    });
  });

  it('throws when an unknown scope is detected within multiple scopes', async () => {
    await expect(
      validatePrTitle('fix(core,e2e,foo,bar): Bar', {scopes: ['foo', 'core']})
    ).rejects.toThrow(
      'Unknown scopes "e2e,bar" found in pull request title "fix(core,e2e,foo,bar): Bar". Scope must match one of: foo, core.'
    );
  });

  it('throws when an unknown scope is detected within multiple scopes and a regex', async () => {
    await expect(
      validatePrTitle('fix(CORE,e2e,foo,bar): Bar', {
        scopes: ['foo', '[A-Z]+']
      })
    ).rejects.toThrow(
      'Unknown scopes "e2e,bar" found in pull request title "fix(CORE,e2e,foo,bar): Bar". Scope must match one of: foo, [A-Z]+.'
    );
  });

  it('throws when an unknown scope is detected', async () => {
    await expect(
      validatePrTitle('fix(core): Bar', {scopes: ['foo']})
    ).rejects.toThrow(
      'Unknown scope "core" found in pull request title "fix(core): Bar". Scope must match one of: foo.'
    );
  });

  it('throws when an unknown scope is detected for auto-wrapped regex matching', async () => {
    await expect(
      validatePrTitle('fix(score): Bar', {scopes: ['core']})
    ).rejects.toThrow(
      'Unknown scope "score" found in pull request title "fix(score): Bar". Scope must match one of: core.'
    );
  });

  it('throws when an unknown scope is detected for auto-wrapped regex matching when input is already wrapped', async () => {
    await expect(
      validatePrTitle('fix(score): Bar', {scopes: ['^[A-Z]+$']})
    ).rejects.toThrow(
      'Unknown scope "score" found in pull request title "fix(score): Bar". Scope must match one of: ^[A-Z]+$.'
    );
  });

  it('throws when an unknown scope is detected for regex matching', async () => {
    await expect(
      validatePrTitle('fix(core): Bar', {scopes: ['[A-Z]+']})
    ).rejects.toThrow(
      'Unknown scope "core" found in pull request title "fix(core): Bar". Scope must match one of: [A-Z]+.'
    );
  });

  describe('require scope', () => {
    describe('scope allowlist defined', () => {
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
          'No scope found in pull request title "fix: Bar". Scope must match one of: foo, bar.'
        );
      });
    });

    describe('disallow scopes', () => {
      it('passes when a single scope is provided, but not present in disallowScopes with one item', async () => {
        await validatePrTitle('fix(core): Bar', {disallowScopes: ['release']});
      });

      it('passes when a single scope is provided, but not present in disallowScopes with one regex item', async () => {
        await validatePrTitle('fix(core): Bar', {disallowScopes: ['[A-Z]+']});
      });

      it('passes when multiple scopes are provided, but not present in disallowScopes with one item', async () => {
        await validatePrTitle('fix(core,e2e,bar): Bar', {
          disallowScopes: ['release']
        });
      });

      it('passes when multiple scopes are provided, but not present in disallowScopes with one regex item', async () => {
        await validatePrTitle('fix(core,e2e,bar): Bar', {
          disallowScopes: ['[A-Z]+']
        });
      });

      it('passes when a single scope is provided, but not present in disallowScopes with multiple items', async () => {
        await validatePrTitle('fix(core): Bar', {
          disallowScopes: ['release', 'test', '[A-Z]+']
        });
      });

      it('passes when multiple scopes are provided, but not present in disallowScopes with multiple items', async () => {
        await validatePrTitle('fix(core,e2e,bar): Bar', {
          disallowScopes: ['release', 'test', '[A-Z]+']
        });
      });

      it('throws when a single scope is provided and it is present in disallowScopes with one item', async () => {
        await expect(
          validatePrTitle('fix(release): Bar', {disallowScopes: ['release']})
        ).rejects.toThrow('Disallowed scope was found: release');
      });

      it('throws when a single scope is provided and it is present in disallowScopes with one regex item', async () => {
        await expect(
          validatePrTitle('fix(RELEASE): Bar', {disallowScopes: ['[A-Z]+']})
        ).rejects.toThrow('Disallowed scope was found: RELEASE');
      });

      it('throws when a single scope is provided and it is present in disallowScopes with multiple item', async () => {
        await expect(
          validatePrTitle('fix(release): Bar', {
            disallowScopes: ['release', 'test']
          })
        ).rejects.toThrow('Disallowed scope was found: release');
      });

      it('throws when a single scope is provided and it is present in disallowScopes with multiple regex item', async () => {
        await expect(
          validatePrTitle('fix(RELEASE): Bar', {
            disallowScopes: ['[A-Z]+', '^[A-Z].+$']
          })
        ).rejects.toThrow('Disallowed scope was found: RELEASE');
      });

      it('throws when multiple scopes are provided and one of them is present in disallowScopes with one item ', async () => {
        await expect(
          validatePrTitle('fix(release,e2e): Bar', {
            disallowScopes: ['release']
          })
        ).rejects.toThrow('Disallowed scope was found: release');
      });

      it('throws when multiple scopes are provided and one of them is present in disallowScopes with one regex item ', async () => {
        await expect(
          validatePrTitle('fix(RELEASE,e2e): Bar', {
            disallowScopes: ['[A-Z]+']
          })
        ).rejects.toThrow('Disallowed scope was found: RELEASE');
      });

      it('throws when multiple scopes are provided and one of them is present in disallowScopes with multiple items ', async () => {
        await expect(
          validatePrTitle('fix(release,e2e): Bar', {
            disallowScopes: ['release', 'test']
          })
        ).rejects.toThrow('Disallowed scope was found: release');
      });

      it('throws when multiple scopes are provided and one of them is present in disallowScopes with multiple items and a regex', async () => {
        await expect(
          validatePrTitle('fix(RELEASE,e2e): Bar', {
            disallowScopes: ['[A-Z]+', 'test']
          })
        ).rejects.toThrow('Disallowed scope was found: RELEASE');
      });

      it('throws when multiple scopes are provided and more than one of them are present in disallowScopes', async () => {
        await expect(
          validatePrTitle('fix(release,test,CORE): Bar', {
            disallowScopes: ['release', 'test', '[A-Z]+']
          })
        ).rejects.toThrow('Disallowed scopes were found: release, test, CORE');
      });
    });

    describe('scope allowlist not defined', () => {
      it('passes when a scope is provided', async () => {
        await validatePrTitle('fix(core): Bar', {
          requireScope: true
        });
      });

      it('throws when a scope is missing', async () => {
        await expect(
          validatePrTitle('fix: Bar', {
            requireScope: true
          })
        ).rejects.toThrow(
          // Should make no mention of any available scope
          /^No scope found in pull request title "fix: Bar".$/
        );
      });
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

describe('description validation', () => {
  it('does not validate the description by default', async () => {
    await validatePrTitle('fix: sK!"§4123');
  });

  it('can pass the validation when `subjectPatternError` is configured', async () => {
    await validatePrTitle('fix: foobar', {
      subjectPattern: '^(?![A-Z]).+$',
      subjectPatternError:
        'The subject found in the pull request title cannot start with an uppercase character.'
    });
  });

  it('uses the `subjectPatternError` if available when the `subjectPattern` does not match', async () => {
    const customError =
      'The subject found in the pull request title cannot start with an uppercase character.';
    await expect(
      validatePrTitle('fix: Foobar', {
        subjectPattern: '^(?![A-Z]).+$',
        subjectPatternError: customError
      })
    ).rejects.toThrow(customError);
  });

  it('interpolates variables into `subjectPatternError`', async () => {
    await expect(
      validatePrTitle('fix: Foobar', {
        subjectPattern: '^(?![A-Z]).+$',
        subjectPatternError:
          'The subject "{subject}" found in the pull request title "{title}" cannot start with an uppercase character.'
      })
    ).rejects.toThrow(
      'The subject "Foobar" found in the pull request title "fix: Foobar" cannot start with an uppercase character.'
    );
  });

  it('throws for invalid subjects', async () => {
    await expect(
      validatePrTitle('fix: Foobar', {
        subjectPattern: '^(?![A-Z]).+$'
      })
    ).rejects.toThrow(
      'The subject "Foobar" found in pull request title "fix: Foobar" doesn\'t match the configured pattern "^(?![A-Z]).+$".'
    );
  });

  it('throws for only partial matches', async () => {
    await expect(
      validatePrTitle('fix: Foobar', {
        subjectPattern: 'Foo'
      })
    ).rejects.toThrow(
      'The subject "Foobar" found in pull request title "fix: Foobar" isn\'t an exact match for the configured pattern "Foo". Please provide a subject that matches the whole pattern exactly.'
    );
  });

  it('accepts valid subjects', async () => {
    await validatePrTitle('fix: foobar', {
      subjectPattern: '^(?![A-Z]).+$'
    });
  });
});
