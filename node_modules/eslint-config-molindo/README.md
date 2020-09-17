# eslint-config-molindo

## Goals

1. Find errors that are detectable with static analysis.
2. Make reading code easier by providing consistent code style.
3. Make writing code faster by leveraging auto fix wherever possible.

## Usage

1. `yarn add eslint eslint-config-molindo --dev`
2. Setup your project config in `.eslintrc.js`:

```js
// This enables ESLint to use dependencies of this config
// (see https://github.com/eslint/eslint/issues/3458)
require('eslint-config-molindo/setupPlugins');

module.exports = {
  extends: 'molindo/javascript',
  // or
  extends: 'molindo/typescript',
  // or
  extends: ['molindo/javascript', 'molindo/react'],
  // or
  extends: ['molindo/typescript', 'molindo/react']
}
```

3. If you use TypeScript, add `"extends": "eslint-config-molindo/tsconfig.json"` to your `tsconfig.json`.
4. Happy linting!

## Further configuration

### Environment

Set the [`env` in `.eslintrc`](https://eslint.org/docs/user-guide/configuring#specifying-environments) as necessary so ESLint doesn't report missing globals.
 
E.g.:

```json
{
  "browser": true,
  "node": true,
  "es6": true,
  "jest": true
}
```

### Editor integration

It's strongly recommended to use an eslint integration for your editor of choice (e. g. [`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for [VSCode](https://code.visualstudio.com/) so you see warnings and errors while writing code. Also the setting to auto fix errors on save should be turned on, so purely stylistic errors such as the ones reported by `prettier` are fixed automatically.

If your linter plugin checks your code as you type (before you save) it can be helpful to silence stylistic errors to reduce noise and let the formatting happen on save.

## Versioning

 - Patch releases are for improved documentation, fixing a rule to stop reporting false positives and internal code changes.
 - Minor releases are for changes to rules that can automatically be fixed.
 - Major releases happen when rules are changed that can't be fixed automatically.
