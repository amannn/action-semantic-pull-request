# Changelog

### [3.4.6](https://github.com/amannn/action-semantic-pull-request/compare/v3.4.5...v3.4.6) (2021-10-31)


### Bug Fixes

* Better strategy to detect merge commits ([#132](https://github.com/amannn/action-semantic-pull-request/issues/132)) ([f913d37](https://github.com/amannn/action-semantic-pull-request/commit/f913d374b7bc698a5831a12c8955d1373c439548))

### [3.4.5](https://github.com/amannn/action-semantic-pull-request/compare/v3.4.4...v3.4.5) (2021-10-28)


### Bug Fixes

* Consider merge commits for single commit validation ([#131](https://github.com/amannn/action-semantic-pull-request/issues/131)) ([5265383](https://github.com/amannn/action-semantic-pull-request/commit/526538350f2e4eaaac841e586a197de6b019af1f)), closes [#108](https://github.com/amannn/action-semantic-pull-request/issues/108)

### [3.4.4](https://github.com/amannn/action-semantic-pull-request/compare/v3.4.3...v3.4.4) (2021-10-26)


### Reverts

* Revert "fix: Consider merge commits for single commit validation (#127)" ([d40b0d4](https://github.com/amannn/action-semantic-pull-request/commit/d40b0d425a054807cc5e032a827cc5780f507630)), closes [#127](https://github.com/amannn/action-semantic-pull-request/issues/127)

### [3.4.3](https://github.com/amannn/action-semantic-pull-request/compare/v3.4.2...v3.4.3) (2021-10-26)


### Bug Fixes

* Consider merge commits for single commit validation ([#127](https://github.com/amannn/action-semantic-pull-request/issues/127)) ([1b347f7](https://github.com/amannn/action-semantic-pull-request/commit/1b347f79d6518f5d0190913abf7815286f490f53)), closes [#108](https://github.com/amannn/action-semantic-pull-request/issues/108) [#108](https://github.com/amannn/action-semantic-pull-request/issues/108)

### [3.4.2](https://github.com/amannn/action-semantic-pull-request/compare/v3.4.1...v3.4.2) (2021-08-16)


### Bug Fixes

* Don't require `scopes` when `requireScope` enabled ([#114](https://github.com/amannn/action-semantic-pull-request/issues/114)) ([4c0fe2f](https://github.com/amannn/action-semantic-pull-request/commit/4c0fe2f50d26390ef6a2553a01d9bd13bef2caf2))

### [3.4.1](https://github.com/amannn/action-semantic-pull-request/compare/v3.4.0...v3.4.1) (2021-07-26)


### Bug Fixes

* Make link in error message clickable ([#112](https://github.com/amannn/action-semantic-pull-request/issues/112)) ([2a292a6](https://github.com/amannn/action-semantic-pull-request/commit/2a292a6550224ddc9d79731bcd15732b42344ebf))

## [3.4.0](https://github.com/amannn/action-semantic-pull-request/compare/v3.3.0...v3.4.0) (2021-02-15)


### Features

* Add `validateSingleCommit` flag to validate the commit message if there's only a single commit in the PR (opt-in). This is intended to be used as a workaround for an issue with Github as in this case, the PR title won't be used as the default commit message when merging a PR. ([#87](https://github.com/amannn/action-semantic-pull-request/issues/87)) ([3f20459](https://github.com/amannn/action-semantic-pull-request/commit/3f20459aa1121f2f0093f06f565a95fe7c5cf402))

## [3.3.0](https://github.com/amannn/action-semantic-pull-request/compare/v3.2.6...v3.3.0) (2021-02-10)


### Features

* Add ability to use multiple scopes ([#85](https://github.com/amannn/action-semantic-pull-request/issues/85)) ([d6aabb6](https://github.com/amannn/action-semantic-pull-request/commit/d6aabb6fedc5f57cec60b16db8595a92f1e263ab))

### [3.2.6](https://github.com/amannn/action-semantic-pull-request/compare/v3.2.5...v3.2.6) (2021-01-25)


### Bug Fixes

* Publish changelog ([47ac28b](https://github.com/amannn/action-semantic-pull-request/commit/47ac28b008b9b34b6cda0c1d558f4b8f25a0d3bb))

### [3.2.1](https://github.com/amannn/action-semantic-pull-request/compare/v3.2.0...v3.2.1) (2021-01-19)


### Bug Fixes

* Move configuration docs to a separate section ([dd78147](https://github.com/amannn/action-semantic-pull-request/commit/dd78147b453899371b7406672fb5ebe9dc5e2c5f))

## [3.2.0](https://github.com/amannn/action-semantic-pull-request/compare/v3.1.0...v3.2.0) (2021-01-18)


### Features

* Add `subjectPatternError` option to allow users to override the default error when `subjectPattern` doesn't match ([#76](https://github.com/amannn/action-semantic-pull-request/issues/76)) ([e617d81](https://github.com/amannn/action-semantic-pull-request/commit/e617d811330c87d229d4d7c9a91517f6197869a2))

## [3.1.0](https://github.com/amannn/action-semantic-pull-request/compare/v3.0.0...v3.1.0) (2021-01-11)


### Features

* Add regex validation for subject ([#71](https://github.com/amannn/action-semantic-pull-request/issues/71)) ([04b071e](https://github.com/amannn/action-semantic-pull-request/commit/04b071e606842fe1c6b50fcbc0cab856c7d1cb49))

## [3.0.0](https://github.com/amannn/action-semantic-pull-request/compare/v2.2.0...v3.0.0) (2021-01-08)


### ⚠ BREAKING CHANGES

* Add opt-in for WIP (#73)

### Features

* Add opt-in for WIP ([#73](https://github.com/amannn/action-semantic-pull-request/issues/73)) ([fb077fa](https://github.com/amannn/action-semantic-pull-request/commit/fb077fa571d6e14bc0ba9bc5b971e741ac693399))

## [2.2.0](https://github.com/amannn/action-semantic-pull-request/compare/v2.1.1...v2.2.0) (2020-12-21)


### Features

* Add ability to constrain scopes ([#66](https://github.com/amannn/action-semantic-pull-request/issues/66)) ([95b7031](https://github.com/amannn/action-semantic-pull-request/commit/95b703180f65c7da62280f216fb2a6fcc176dd26))

### [2.1.1](https://github.com/amannn/action-semantic-pull-request/compare/v2.1.0...v2.1.1) (2020-12-03)


### Bug Fixes

* Get rid of deprecation notice ([#63](https://github.com/amannn/action-semantic-pull-request/issues/63)) ([ec157ab](https://github.com/amannn/action-semantic-pull-request/commit/ec157abe0cb1f9c0ec79c022db8a5e6245f53df8))

## [2.1.0](https://github.com/amannn/action-semantic-pull-request/compare/v2.0.0...v2.1.0) (2020-10-21)


### Features

* Allow configuration for custom types ([@alorma](https://github.com/alorma), [@mrchief](https://github.com/mrchief) and [@amannn](https://github.com/amannn) in [#53](https://github.com/amannn/action-semantic-pull-request/issues/53)) ([2fe39e2](https://github.com/amannn/action-semantic-pull-request/commit/2fe39e2ce8ed0337bff045b6b6457e685d0dd51f))

## [2.0.0](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.10...v2.0.0) (2020-09-17)


### ⚠ BREAKING CHANGES

* Remove support for `improvement` prefix (as per commitizen/conventional-commit-types#16).

### Miscellaneous Chores

* Update dependencies. ([b9bc3f1](https://github.com/amannn/action-semantic-pull-request/commit/b9bc3f12d1e30b03273a4077cb7936b091fb1ba2))

### [1.2.10](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.9...v1.2.10) (2020-09-17)


### ⚠ BREAKING CHANGES

* Remove support for `improvement` prefix (as per https://github.com/commitizen/conventional-commit-types/pull/16).

### Miscellaneous Chores

* Update dependencies ([#31](https://github.com/amannn/action-semantic-pull-request/issues/31)) ([2aa2eb7](https://github.com/amannn/action-semantic-pull-request/commit/2aa2eb7e08ff8a6d0eaf3d42df0efec1cdeb1984))

### [1.2.9](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.8...v1.2.9) (2020-09-17)


### Bug Fixes

* Improve reporting for failed checks ([#30](https://github.com/amannn/action-semantic-pull-request/issues/30)) ([1aa9e17](https://github.com/amannn/action-semantic-pull-request/commit/1aa9e172840b7e07c0751e80aa03271b80d27ebe))

### [1.2.8](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.7...v1.2.8) (2020-08-23)

### [1.2.7](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.6...v1.2.7) (2020-08-22)


### Bug Fixes

* update workflow to use pull_request_target ([#25](https://github.com/amannn/action-semantic-pull-request/issues/25)) ([73f02a4](https://github.com/amannn/action-semantic-pull-request/commit/73f02a44b31b2c716caf45cc18e5e12d405ae225)), closes [#24](https://github.com/amannn/action-semantic-pull-request/issues/24)

### [1.2.6](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.5...v1.2.6) (2020-08-14)

### [1.2.5](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.4...v1.2.5) (2020-08-14)

### [1.2.4](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.3...v1.2.4) (2020-08-14)

### [1.2.3](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.2...v1.2.3) (2020-08-14)

### [1.2.2](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.1...v1.2.2) (2020-06-15)


### Bug Fixes

* Bump npm from 6.13.0 to 6.14.5 ([#8](https://github.com/amannn/action-semantic-pull-request/issues/8)) ([9779e20](https://github.com/amannn/action-semantic-pull-request/commit/9779e20f1998f8b97180af283e8f4b29f120d44f))

### [1.2.1](https://github.com/amannn/action-semantic-pull-request/compare/v1.2.0...v1.2.1) (2020-05-13)

## [1.2.0](https://github.com/amannn/action-semantic-pull-request/compare/v1.1.1...v1.2.0) (2019-11-20)


### Features

* Add [WIP] support.  ([#3](https://github.com/amannn/action-semantic-pull-request/issues/3)) ([2b4d25e](https://github.com/amannn/action-semantic-pull-request/commit/2b4d25ed4b55efc389f5e5898b061615ae96a1da))

### 1.1.1 First usable release
