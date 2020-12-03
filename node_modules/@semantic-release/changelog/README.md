# @semantic-release/changelog

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to create or update a changelog file.

[![Travis](https://img.shields.io/travis/semantic-release/changelog.svg)](https://travis-ci.org/semantic-release/changelog)
[![Codecov](https://img.shields.io/codecov/c/github/semantic-release/changelog.svg)](https://codecov.io/gh/semantic-release/changelog)
[![Greenkeeper badge](https://badges.greenkeeper.io/semantic-release/changelog.svg)](https://greenkeeper.io/)

[![npm latest version](https://img.shields.io/npm/v/@semantic-release/changelog/latest.svg)](https://www.npmjs.com/package/@semantic-release/changelog)
[![npm next version](https://img.shields.io/npm/v/@semantic-release/changelog/next.svg)](https://www.npmjs.com/package/@semantic-release/changelog)

| Step               | Description                                                                                                                                                                                           |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify the `changelogFile` and `changelogTitle` options configuration.                                                                                                                                |
| `prepare`          | Create or update a changelog file in the local project directory with the changelog content created in the [generate notes step](https://github.com/semantic-release/semantic-release#release-steps). |

## Install

```bash
$ npm install @semantic-release/changelog -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      "changelogFile": "docs/CHANGELOG.md",
    }],
    ["@semantic-release/git", {
      "assets": ["docs/CHANGELOG.md"],
    }],
  ]
}
```

With this example, for each release, a `docs/CHANGELOG.md` will be created or updated.

## Configuration

### Options

| Options          | Description                                           | Default        |
|------------------|-------------------------------------------------------|----------------|
| `changelogFile`  | File path of the changelog.                           | `CHANGELOG.md` |
| `changelogTitle` | Title of the changelog file (first line of the file). | -              |

### Examples

When used with the [@semantic-release/git](https://github.com/semantic-release/git) or [@semantic-release/npm](https://github.com/semantic-release/npm) plugins the `@semantic-release/changelog` plugin must be called first in order to update the changelog file so the [@semantic-release/git](https://github.com/semantic-release/git) and [@semantic-release/npm](https://github.com/semantic-release/npm) plugins can include it in the release.

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ],
}
```
