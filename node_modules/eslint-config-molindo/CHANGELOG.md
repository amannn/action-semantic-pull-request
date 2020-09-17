# CHANGELOG

## 5.0.0

### Features

 - TypeScript support.
 - Remove peer dependencies in favour of actual dependencies.
 - Add automatic version detection for React.
 - Allow more recent versions of dependencies.
 - Warn about [confusing browser globals](https://www.npmjs.com/package/confusing-browser-globals) when accessing them without `window`.
 - Sort desctructured keys when using the React config (useful for destructured props to match the prop type definition).
 - Add useful rules from [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn): `unicorn/explicit-length-check`, `unicorn/import-index`, `unicorn/no-abusive-eslint-disable`
 - Imports are alphabetized (within individual groups: dependencies, internal, local, etc.).
 - Validate that array methods like `map` and `filter` return something.
 - Improve React component method sorting if you're using classes.
 - Add `react/button-has-type`.

### Fixes

 - Removed `no-lonely-if` since there are valid cases for this pattern.
 - Keep `trailingComma: 'none'` for newer prettier versions.
 - Keep auto fix behaviour of `react-hooks/exhaustive-deps` in more recent versions.
 - Replace `jsx-a11y/label-has-for` with `jsx-a11y/label-has-associated-control`.
 - Allow for/of statements as there are valid use cases.

### Breaking changes

 - The base JavaScript config `molindo` has been renamed to `molindo/javascript`.
 - The base JavaScript config is no longer included in the React config. Use `"extends": ["molindo/javascript", "molindo/react"]` to use both.
 - Require a minimum version of Node.js 10.
 - Use `eslint@^7.0.0`.
 - A declaration style is now enforced for functions. Since there's no auto fix, it's probably the best option to override this rule in existing code bases which use a different style extensively.
 - This config now installs the relevant plugins automatically. However you have to use the JavaScript version of the ESLint config (`.eslintrc.js`) and add `require('eslint-config-molindo/setupPlugins')` there. Alternatively you can still install all necessary plugins yourself.
