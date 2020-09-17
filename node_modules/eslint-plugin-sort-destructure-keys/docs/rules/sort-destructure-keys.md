# require object destructure keys to be sorted (sort-destructure-keys)

Keys in an object pattern should be sorted in alphabetical order. The exception
being when any of those keys have a default value equal to previously
destructured key.

## Rule Details

Examples of **incorrect** code for this rule:

```js
const {b, a} = someObj;
```

Examples of **correct** code for this rule:

```js
const {a, b} = someObj;

const {b, a = b} = someObj;
```
