# @semantic-release/github

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to publish a
[GitHub release](https://help.github.com/articles/about-releases) and comment on released Pull Requests/Issues.

[![Travis](https://img.shields.io/travis/semantic-release/github.svg)](https://travis-ci.org/semantic-release/github)
[![Codecov](https://img.shields.io/codecov/c/github/semantic-release/github.svg)](https://codecov.io/gh/semantic-release/github)
[![Greenkeeper badge](https://badges.greenkeeper.io/semantic-release/github.svg)](https://greenkeeper.io/)

[![npm latest version](https://img.shields.io/npm/v/@semantic-release/github/latest.svg)](https://www.npmjs.com/package/@semantic-release/github)
[![npm next version](https://img.shields.io/npm/v/@semantic-release/github/next.svg)](https://www.npmjs.com/package/@semantic-release/github)

| Step               | Description                                                                                                                                                                                                                              |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify the presence and the validity of the authentication (set via [environment variables](#environment-variables)) and the [assets](#assets) option configuration.                                                                     |
| `publish`          | Publish a [GitHub release](https://help.github.com/articles/about-releases), optionally uploading file assets.                                                                                                                           |
| `success`          | Add a comment to each [GitHub Issue](https://help.github.com/articles/about-issues) or [Pull Request](https://help.github.com/articles/about-pull-requests) resolved by the release and close issues previously open by the `fail` step. |
| `fail`             | Open or update a [GitHub Issue](https://help.github.com/articles/about-issues) with information about the errors that caused the release to fail.                                                                                        |

## Install

```bash
$ npm install @semantic-release/github -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/github", {
      "assets": [
        {"path": "dist/asset.min.css", "label": "CSS distribution"},
        {"path": "dist/asset.min.js", "label": "JS distribution"}
      ]
    }],
  ]
}
```

With this example [GitHub releases](https://help.github.com/articles/about-releases) will be published with the file `dist/asset.min.css` and `dist/asset.min.js`.

## Configuration

### GitHub authentication

The GitHub authentication configuration is **required** and can be set via [environment variables](#environment-variables).

Follow the [Creating a personal access token for the command line](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line) documentation to obtain an authentication token. The token has to be made available in your CI environment via the `GH_TOKEN` environment variable. The user associated with the token must have push permission to the repository.

When creating the token, the **minimum required scopes** are:

- [`repo`](https://github.com/settings/tokens/new?scopes=repo) for a private repository
- [`public_repo`](https://github.com/settings/tokens/new?scopes=public_repo) for a public repository

### Environment variables

| Variable                       | Description                                               |
| ------------------------------ | --------------------------------------------------------- |
| `GH_TOKEN` or `GITHUB_TOKEN`   | **Required.** The token used to authenticate with GitHub. |
| `GH_URL` or `GITHUB_URL`       | The GitHub Enterprise endpoint.                           |
| `GH_PREFIX` or `GITHUB_PREFIX` | The GitHub Enterprise API prefix.                         |

### Options

| Option                | Description                                                                                                                                                                         | Default                                                                                                                                              |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `githubUrl`           | The GitHub Enterprise endpoint.                                                                                                                                                     | `GH_URL` or `GITHUB_URL` environment variable.                                                                                                       |
| `githubApiPathPrefix` | The GitHub Enterprise API prefix.                                                                                                                                                   | `GH_PREFIX` or `GITHUB_PREFIX` environment variable.                                                                                                 |
| `proxy`               | The proxy to use to access the GitHub API. See [proxy](#proxy).                                                                                                                     | `HTTP_PROXY` environment variable.                                                                                                                   |
| `assets`              | An array of files to upload to the release. See [assets](#assets).                                                                                                                  | -                                                                                                                                                    |
| `successComment`      | The comment to add to each issue and pull request resolved by the release. Set to `false` to disable commenting on issues and pull requests. See [successComment](#successcomment). | `:tada: This issue has been resolved in version ${nextRelease.version} :tada:\n\nThe release is available on [GitHub release](<github_release_url>)` |
| `failComment`         | The content of the issue created when a release fails. Set to `false` to disable opening an issue when a release fails. See [failComment](#failcomment).                            | Friendly message with links to **semantic-release** documentation and support, with the list of errors that caused the release to fail.              |
| `failTitle`           | The title of the issue created when a release fails. Set to `false` to disable opening an issue when a release fails.                                                               | `The automated release is failing 🚨`                                                                                                                |
| `labels`              | The [labels](https://help.github.com/articles/about-labels) to add to the issue created when a release fails. Set to `false` to not add any label.                                  | `['semantic-release']`                                                                                                                               |
| `assignees`           | The [assignees](https://help.github.com/articles/assigning-issues-and-pull-requests-to-other-github-users) to add to the issue created when a release fails.                        | -                                                                                                                                                    |
| `releasedLabels`      | The [labels](https://help.github.com/articles/about-labels) to add to each issue and pull request resolved by the release. Set to `false` to not add any label.                     | `['released']`                                                                                                                                       |

#### proxy

Can be a the proxy URL or and `Object` with the following properties:

| Property      | Description                                                    | Default                              |
|---------------|----------------------------------------------------------------|--------------------------------------|
| `host`        | **Required.** Proxy host to connect to.                        | -                                    |
| `port`        | **Required.** Proxy port to connect to.                        | File name extracted from the `path`. |
| `secureProxy` | If `true`, then use TLS to connect to the proxy.               | `false`                              |
| `headers`     | Additional HTTP headers to be sent on the HTTP CONNECT method. | -                                    |

See [node-https-proxy-agent](https://github.com/TooTallNate/node-https-proxy-agent#new-httpsproxyagentobject-options) and [node-http-proxy-agent](https://github.com/TooTallNate/node-http-proxy-agent) for additional details.

##### proxy examples

`'http://168.63.76.32:3128'`: use the proxy running on host `168.63.76.32` and port `3128` for each GitHub API request.
`{host: '168.63.76.32', port: 3128, headers: {Foo: 'bar'}}`: use the proxy running on host `168.63.76.32` and port `3128` for each GitHub API request, setting the `Foo` header value to `bar`.

#### assets

Can be a [glob](https://github.com/isaacs/node-glob#glob-primer) or and `Array` of
[globs](https://github.com/isaacs/node-glob#glob-primer) and `Object`s with the following properties:

| Property | Description                                                                                              | Default                              |
| -------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `path`   | **Required.** A [glob](https://github.com/isaacs/node-glob#glob-primer) to identify the files to upload. | -                                    |
| `name`   | The name of the downloadable file on the GitHub release.                                                 | File name extracted from the `path`. |
| `label`  | Short description of the file displayed on the GitHub release.                                           | -                                    |

Each entry in the `assets` `Array` is globbed individually. A [glob](https://github.com/isaacs/node-glob#glob-primer)
can be a `String` (`"dist/**/*.js"` or `"dist/mylib.js"`) or an `Array` of `String`s that will be globbed together
(`["dist/**", "!**/*.css"]`).

If a directory is configured, all the files under this directory and its children will be included.

The `name` and `label` for each assets are generated with [Lodash template](https://lodash.com/docs#template). The following variables are available:

| Parameter     | Description                                                                         |
|---------------|-------------------------------------------------------------------------------------|
| `branch`      | The branch from which the release is done.                                          |
| `lastRelease` | `Object` with `version`, `gitTag` and `gitHead` of the last release.                |
| `nextRelease` | `Object` with `version`, `gitTag`, `gitHead` and `notes` of the release being done. |
| `commits`     | `Array` of commit `Object`s with `hash`, `subject`, `body` `message` and `author`.  |

**Note**: If a file has a match in `assets` it will be included even if it also has a match in `.gitignore`.

##### assets examples

`'dist/*.js'`: include all the `js` files in the `dist` directory, but not in its sub-directories.

`[['dist', '!**/*.css']]`: include all the files in the `dist` directory and its sub-directories excluding the `css`
files.

`[{path: 'dist/MyLibrary.js', label: 'MyLibrary JS distribution'}, {path: 'dist/MyLibrary.css', label: 'MyLibrary CSS
distribution'}]`: include the `dist/MyLibrary.js` and `dist/MyLibrary.css` files, and label them `MyLibrary JS
distribution` and `MyLibrary CSS distribution` in the GitHub release.

`[['dist/**/*.{js,css}', '!**/*.min.*'], {path: 'build/MyLibrary.zip', label: 'MyLibrary'}]`: include all the `js` and
`css` files in the `dist` directory and its sub-directories excluding the minified version, plus the
`build/MyLibrary.zip` file and label it `MyLibrary` in the GitHub release.

`[{path: 'dist/MyLibrary.js', name: 'MyLibrary-${nextRelease.gitTag}.js', label: 'MyLibrary JS (${nextRelease.gitTag}) distribution'}]`: include the file `dist/MyLibrary.js` and upload it to the GitHub release with name `MyLibrary-v1.0.0.js` and label `MyLibrary JS (v1.0.0) distribution` which will generate the link:

> `[MyLibrary JS (v1.0.0) distribution](MyLibrary-v1.0.0.js)`

#### successComment

The message for the issue comments is generated with [Lodash template](https://lodash.com/docs#template). The following variables are available:

| Parameter     | Description                                                                                                                                                                                                                                                                   |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `branch`      | The branch from which the release is done.                                                                                                                                                                                                                                    |
| `lastRelease` | `Object` with `version`, `gitTag` and `gitHead` of the last release.                                                                                                                                                                                                          |
| `nextRelease` | `Object` with `version`, `gitTag`, `gitHead` and `notes` of the release being done.                                                                                                                                                                                           |
| `commits`     | `Array` of commit `Object`s with `hash`, `subject`, `body` `message` and `author`.                                                                                                                                                                                            |
| `releases`    | `Array` with a release `Object`s for each release published, with optional release data such as `name` and `url`.                                                                                                                                                             |
| `issue`       | A [GitHub API pull request object](https://developer.github.com/v3/search/#search-issues) for pull requests related to a commit, or an `Object` with the `number` property for issues resolved via [keywords](https://help.github.com/articles/closing-issues-using-keywords) |

##### successComment examples

The `successComment` `This ${issue.pull_request ? 'pull request' : 'issue'} is included in version ${nextRelease.version}` will generate the comment:

> This pull request is included in version 1.0.0

#### failComment

The message for the issue content is generated with [Lodash template](https://lodash.com/docs#template). The following variables are available:

| Parameter | Description                                                                                                                                                                                                                                                                                                            |
|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `branch`  | The branch from which the release had failed.                                                                                                                                                                                                                                                                          |
| `errors`  | An `Array` of [SemanticReleaseError](https://github.com/semantic-release/error). Each error has the `message`, `code`, `pluginName` and `details` properties.<br>`pluginName` contains the package name of the plugin that threw the error.<br>`details` contains a information about the error formatted in markdown. |

##### failComment examples

The `failComment` `This release from branch ${branch} had failed due to the following errors:\n- ${errors.map(err => err.message).join('\\n- ')}` will generate the comment:

> This release from branch master had failed due to the following errors:
> - Error message 1
> - Error message 2
