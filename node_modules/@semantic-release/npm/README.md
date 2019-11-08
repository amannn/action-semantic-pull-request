# @semantic-release/npm

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to publish a [npm](https://www.npmjs.com) package.

[![Travis](https://img.shields.io/travis/semantic-release/npm.svg)](https://travis-ci.org/semantic-release/npm)
[![Codecov](https://img.shields.io/codecov/c/github/semantic-release/npm.svg)](https://codecov.io/gh/semantic-release/npm)
[![Greenkeeper badge](https://badges.greenkeeper.io/semantic-release/npm.svg)](https://greenkeeper.io/)

[![npm latest version](https://img.shields.io/npm/v/@semantic-release/npm/latest.svg)](https://www.npmjs.com/package/@semantic-release/npm)
[![npm next version](https://img.shields.io/npm/v/@semantic-release/npm/next.svg)](https://www.npmjs.com/package/@semantic-release/npm)

| Step               | Description                                                                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify the presence of the `NPM_TOKEN` environment variable, create or update the `.npmrc` file with the token and verify the token is valid. |
| `prepare`          | Update the `package.json` version and [create](https://docs.npmjs.com/cli/pack) the npm package tarball.                                      |
| `publish`          | [Publish the npm package](https://docs.npmjs.com/cli/publish) to the registry.                                                                |

## Install

```bash
$ npm install @semantic-release/npm -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
  ]
}
```

## Configuration

### Npm registry authentication

The npm authentication configuration is **required** and can be set via [environment variables](#environment-variables).

Both the [token](https://docs.npmjs.com/getting-started/working_with_tokens) and the legacy (`username`, `password` and `email`) authentication are supported. It is recommended to use the [token](https://docs.npmjs.com/getting-started/working_with_tokens) authentication. The legacy authentication is supported as the alternative npm registries [Artifactory](https://www.jfrog.com/open-source/#os-arti) and [npm-registry-couchapp](https://github.com/npm/npm-registry-couchapp) only supports that form of authentication.

**Note**: Only the `auth-only` [level of npm two-factor authentication](https://docs.npmjs.com/getting-started/using-two-factor-authentication#levels-of-authentication) is supported, **semantic-release** will not work with the default `auth-and-writes` level.

### Environment variables

| Variable       | Description                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `NPM_TOKEN`    | Npm token created via [npm token create](https://docs.npmjs.com/getting-started/working_with_tokens#how-to-create-new-tokens) |
| `NPM_USERNAME` | Npm username created via [npm adduser](https://docs.npmjs.com/cli/adduser) or on [npmjs.com](https://www.npmjs.com)           |
| `NPM_PASSWORD` | Password of the npm user.                                                                                                     |
| `NPM_EMAIL`    | Email address associated with the npm user                                                                                    |

Use either `NPM_TOKEN` for token authentication or `NPM_USERNAME`, `NPM_PASSWORD` and `NPM_EMAIL` for legacy authentication

### Options

| Options      | Description                                                                                                         | Default                                                                                                                          |
|--------------|---------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `npmPublish` | Whether to publish the `npm` package to the registry. If `false` the `package.json` version will still be updated.  | `false` if the `package.json` [private](https://docs.npmjs.com/files/package.json#private) property is `true`, `true` otherwise. |
| `pkgRoot`    | Directory path to publish.                                                                                          | `.`                                                                                                                              |
| `tarballDir` | Directory path in which to write the the package tarball. If `false` the tarball is not be kept on the file system. | `false`                                                                                                                          |

**Note**: The `pkgRoot` directory must contains a `package.json`. The version will be updated only in the `package.json` and `npm-shrinkwrap.json` within the `pkgRoot` directory.

**Note**: If you use a [shareable configuration](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/shareable-configurations.md#shareable-configurations) that defines one of these options you can set it to `false` in your [**semantic-release** configuration](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration) in order to use the default value.

### Npm configuration

The plugin uses the [`npm` CLI](https://github.com/npm/cli) which will read the configuration from [`.npmrc`](https://docs.npmjs.com/files/npmrc). See [`npm config`](https://docs.npmjs.com/misc/config) for the option list.

The [`registry`](https://docs.npmjs.com/misc/registry) can be configured via the npm environment variable `NPM_CONFIG_REGISTRY` and will take precedence over the configuration in `.npmrc`.

The [`registry`](https://docs.npmjs.com/misc/registry) and [`dist-tag`](https://docs.npmjs.com/cli/dist-tag) can be configured in the `package.json` and will take precedence over the configuration in `.npmrc` and `NPM_CONFIG_REGISTRY`:
```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "tag": "latest"
  }
}
```

### Examples

The `npmPublish` and `tarballDir` option can be used to skip the publishing to the `npm` registry and instead, release the package tarball with another plugin. For example with the [@semantic-release/github](https://github.com/semantic-release/github) plugin:

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/npm", {
      "npmPublish": false,
      "tarballDir": "dist",
    }],
    ["@semantic-release/github", {
      "assets": "dist/*.tgz"
    }]
  ]
}
```

When publishing from a sub-directory with the `pkgRoot` option, the `package.json` and `npm-shrinkwrap.json` updated with the new version can be moved to another directory with a `postpublish` [npm script](https://docs.npmjs.com/misc/scripts). For example with the [@semantic-release/git](https://github.com/semantic-release/git) plugin:

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/npm", {
      "pkgRoot": "dist",
    }],
    ["@semantic-release/git", {
      "assets": ["package.json", "npm-shrinkwrap.json"]
    }]
  ]
}
```
```json
{
  "scripts": {
    "postpublish": "cp -r dist/package.json . && cp -r dist/npm-shrinkwrap.json ."
  }
}
```
