const rule = require("../../../lib/rules/sort-destructure-keys");
const RuleTester = require("eslint").RuleTester;

function msg(second, first) {
  return {
    messageId: "sort",
    data: { first, second },
  };
}

function just(...args) {
  return [msg(...args)];
}

function testsWithParser(parser) {
  describe(`with parser: ${parser}`, () => {
    const ruleTester = new RuleTester({
      parser: require.resolve(parser),
      parserOptions: {
        ecmaVersion: 2018,
      },
    });

    const testsFor = (name, ...args) => ruleTester.run(name, rule, ...args);

    testsFor("basic sorting", {
      valid: [
        `
          const {
              a,
              b
          } = someObj;
        `,
        "const {a, b} = someObj;",
        "const {a, b: c} = someObj;",
        "const {aBc, abd} = someObj;",
        "const {a: foo, b} = someObj;",
        "const func = ({a, b}) => a + b;",
      ],
      invalid: [
        {
          code: "const {b, a} = someObj;",
          errors: just("b", "a"),
          output: "const {a, b} = someObj;",
        },
        {
          code: "const {a, c, b} = someObj;",
          errors: just("c", "b"),
          output: "const {a, b, c} = someObj;",
        },
        {
          code: `
            const {
                b,
                a = 3,
                c
            } = someObj;
          `,
          errors: just("b", "a"),
          output: `
            const {
                a = 3,
                b,
                c
            } = someObj;
          `,
        },
        {
          code: "const func = ({b, a}) => a + b;",
          errors: just("b", "a"),
          output: "const func = ({a, b}) => a + b;",
        },
      ],
    });

    testsFor("rest properties", {
      valid: [
        "const {a, ...other} = someObj;",
        "const {a, b, ...other} = someObj;",
        "const {...other} = someObj;",
      ],
      invalid: [
        {
          code: "const {b, a, ...rest} = someObj;",
          errors: just("b", "a"),
          output: "const {a, b, ...rest} = someObj;",
        },
        {
          code: `
            function foo({
                b = false,
                a,
                ...rest
            }) {}
          `,
          errors: just("b", "a"),
          output: `
            function foo({
                a,
                b = false,
                ...rest
            }) {}
          `,
        },
      ],
    });

    testsFor("key literals", {
      valid: [
        "const {1: a, 2: b} = someObj;",
        "const {'a': a, 'b': b} = someObj;",
      ],
      invalid: [
        {
          code: "const {2: b, 1: a} = someObj;",
          errors: just("2", "1"),
          output: "const {1: a, 2: b} = someObj;",
        },
        {
          code: "const {'b': b, 'a': a} = someObj;",
          errors: just("b", "a"),
          output: "const {'a': a, 'b': b} = someObj;",
        },
      ],
    });

    testsFor("default literals", {
      valid: [
        "const {a = {}, b = {}} = someObj;",
        "const {a = 1, b = '2'} = someObj;",
      ],
      invalid: [
        {
          code: "const {a, c, b = 2} = someObj;",
          errors: just("c", "b"),
          output: "const {a, b = 2, c} = someObj;",
        },
      ],
    });

    testsFor("default identifiers", {
      valid: [
        "const {b, a = b} = someObj;",
        "const {b, ['a']: {x = b}} = someObj;",
        "const {a, c: {e, d = e}, b} = someObj;",
      ],
      invalid: [
        {
          code: "const {a, c: {e, d}, b = c} = someObj;",
          errors: just("e", "d"),
          output: "const {a, c: {d, e}, b = c} = someObj;",
        },
        {
          code: "const {a, c, b = 3} = someObj;",
          errors: just("c", "b"),
          output: "const {a, b = 3, c} = someObj;",
        },
      ],
    });

    testsFor("nested object patterns", {
      valid: ["const {a: {b, c}, d: {e, f: {g}}} = someObj;"],
      invalid: [
        {
          code: "const {a, b, c: {e, d}} = someObj;",
          errors: just("e", "d"),
          output: "const {a, b, c: {d, e}} = someObj;",
        },
        {
          code: "const {a, c: {e, d}, b} = someObj;",
          errors: [msg("e", "d"), msg("c", "b")],
          output: "const {a, b, c: {e, d}} = someObj;",
        },
        {
          code: `
            const {
                a,
                b: {
                    e,
                    d
                },
                c
            } = someObj;
          `,
          errors: just("e", "d"),
          output: `
            const {
                a,
                b: {
                    d,
                    e
                },
                c
            } = someObj;
          `,
        },
      ],
    });

    testsFor("computed property literals", {
      valid: [
        "const {a, ['b']: x} = someObj;",
        "const {['a']: {c: d}, b} = someObj;",
      ],
      invalid: [
        {
          code: "const {b, ['a']: x, z} = someObj;",
          errors: just("b", "a"),
          output: "const {['a']: x, b, z} = someObj;",
        },
      ],
    });

    testsFor("computed properties", {
      valid: [
        "const {[foo]: bar, [one]: two} = someObj;",
        "const {a, [`b${foo}`]: x} = someObj;",
        `
          const {
            a,
            b,
            ['c']: x,
            ['d']: y,
            [\`\${e}foo\`]: z
          } = someObj;
        `,
        `
          const {
            a,
            [\`\${e}foo\`]: y,
            [\`\${d}foo\`]: z
          } = someObj;
        `,
        `
          const {
            a,
            [\`\${d}foo\`]: z,
            [\`\${e}foo\`]: y
          } = someObj;
        `,
        `
          const {
            [a]: z,
            [b]: y
          } = someObj;
        `,
        `
          const {
            [a.foo]: z,
            [b.bar]: y
          } = someObj;
        `,
        `
          const {
            [b.foo]: z,
            [a.bar]: y
          } = someObj;
        `,
      ],
      invalid: [
        {
          code: "const {[b]: c, a} = someObj;",
          errors: just("b", "a"),
          output: "const {a, [b]: c} = someObj;",
        },
        {
          code: `
            const {
              a,
              b,
              ['d']: y,
              ['c']: x,
              [\`\${e}foo\`]: z
            } = someObj;
          `,
          errors: just("d", "c"),
          output: `
            const {
              a,
              b,
              ['c']: x,
              ['d']: y,
              [\`\${e}foo\`]: z
            } = someObj;
          `,
        },
      ],
    });

    describe("options", () => {
      testsFor("caseSensitive", {
        valid: [
          {
            code: "const {a, b} = someObj;",
            options: [{ caseSensitive: true }],
          },
          {
            code: "const {B, a} = someObj;",
            options: [{ caseSensitive: true }],
          },
          {
            code: "const {aCc, abb} = someObj;",
            options: [{ caseSensitive: true }],
          },
        ],
        invalid: [
          {
            code: "const {b, a} = someObj;",
            errors: just("b", "a"),
            output: "const {a, b} = someObj;",
            options: [{ caseSensitive: true }],
          },
          {
            code: "const {a, B} = someObj;",
            errors: just("a", "B"),
            output: "const {B, a} = someObj;",
            options: [{ caseSensitive: true }],
          },
          {
            code: "const {abc, aBd} = someObj;",
            errors: just("abc", "aBd"),
            output: "const {aBd, abc} = someObj;",
            options: [{ caseSensitive: true }],
          },
        ],
      });
    });
  });
}

describe("sort-destructure-keys", () => {
  testsWithParser("espree");
  testsWithParser("babel-eslint");
});
