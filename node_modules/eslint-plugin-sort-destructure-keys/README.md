# eslint-plugin-sort-destructure-keys

require object destructure key to be sorted

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-sort-destructure-keys`:

```
$ npm install eslint-plugin-sort-destructure-keys --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-sort-destructure-keys` globally.

## Usage

Add `sort-destructure-keys` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "sort-destructure-keys"
    ]
}
```


Then configure the rule under the rules section.

```json
{
    "rules": {
        "sort-destructure-keys/sort-destructure-keys": 2
    }
}
```

## Rule Options

```json
{
    "sort-destructure-keys/sort-destructure-keys": [2, {"caseSensitive": false}]
}
```

### `caseSensitive`

When `true` the rule will enforce properties to be in case-sensitive order. Default is `false`.

Example of **incorrect** code for the `{"caseSensitive": false}` option:

```js
let {B, a, c} = obj;
```

Example of **correct** code for the `{"caseSensitive": false}` option:

```js
let {a, B, c} = obj;
```

Example of **incorrect** code for the `{"caseSensitive": true}` option:

```js
let {a, B, c} = obj;
```

Example of **correct** code for the `{"caseSensitive": true}` option:

```js
let {B, a, c} = obj;
```

## Changelog

### `1.3.5`

- Add `^7.0.0` to eslint peer dependency. ([#53], by [dsernst])

[#53]: https://github.com/mthadley/eslint-plugin-sort-destructure-keys/pull/53
[dsernst]: https://github.com/dsernst

### `1.3.4`

- Fixes TypeError issue with multiple property expressions ([#20])

[#20]: https://github.com/mthadley/eslint-plugin-sort-destructure-keys/issues/20

### `1.3.3`

- Add `6.0.0` to eslint peer dependency. ([#21], by [@7rulnik])

[#21]: https://github.com/mthadley/eslint-plugin-sort-destructure-keys/pull/21
[@7rulnik]: https://github.com/7rulnik

### `1.3.2`

- Fix bug where computed properties were causing the rule to throw errors. ([#15], thanks [@TSMMark]!)

[#15]: https://github.com/mthadley/eslint-plugin-sort-destructure-keys/issues/15
[@TSMMark]: https://github.com/TSMMark

### `1.3.1`

- Fix bug with rest properties being sorted incorrectly. ([#11], [#12], thanks [@briandastous] and [@njdancer]!)

[#11]: https://github.com/mthadley/eslint-plugin-sort-destructure-keys/issues/11
[@briandastous]: https://github.com/briandastous
[#12]: https://github.com/mthadley/eslint-plugin-sort-destructure-keys/pull/12
[@njdancer]: https://github.com/njdancer

### `1.3.0`

- Add support for `--fix` eslint cli flag

### `1.2.0`

- Add peer dependency support for eslint `^5.0.0`

### `1.1.0`

- Add `caseSensitive` option ([#1] by [@bsonntag])

[#1]: https://github.com/mthadley/eslint-plugin-sort-destructure-keys/pull/1
[@bsonntag]: https://github.com/bsonntag
