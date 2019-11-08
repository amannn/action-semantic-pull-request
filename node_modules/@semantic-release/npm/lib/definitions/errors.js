const pkg = require('../../package.json');

const [homepage] = pkg.homepage.split('#');
const linkify = file => `${homepage}/blob/master/${file}`;

module.exports = {
  EINVALIDNPMPUBLISH: ({npmPublish}) => ({
    message: 'Invalid `npmPublish` option.',
    details: `The [npmPublish option](${linkify('README.md#npmpublish')}) option, if defined, must be a \`Boolean\`.

Your configuration for the \`npmPublish\` option is \`${npmPublish}\`.`,
  }),
  EINVALIDTARBALLDIR: ({tarballDir}) => ({
    message: 'Invalid `tarballDir` option.',
    details: `The [tarballDir option](${linkify('README.md#tarballdir')}) option, if defined, must be a \`String\`.

Your configuration for the \`tarballDir\` option is \`${tarballDir}\`.`,
  }),
  EINVALIDPKGROOT: ({pkgRoot}) => ({
    message: 'Invalid `pkgRoot` option.',
    details: `The [pkgRoot option](${linkify('README.md#pkgroot')}) option, if defined, must be a \`String\`.

Your configuration for the \`pkgRoot\` option is \`${pkgRoot}\`.`,
  }),
  ENONPMTOKEN: ({registry}) => ({
    message: 'No npm token specified.',
    details: `An [npm token](${linkify(
      'README.md#npm-registry-authentication'
    )}) must be created and set in the \`NPM_TOKEN\` environment variable on your CI environment.

Please make sure to create an [npm token](https://docs.npmjs.com/getting-started/working_with_tokens#how-to-create-new-tokens) and to set it in the \`NPM_TOKEN\` environment variable on your CI environment. The token must allow to publish to the registry \`${registry}\`.`,
  }),
  EINVALIDNPMTOKEN: ({registry}) => ({
    message: 'Invalid npm token.',
    details: `The [npm token](${linkify(
      'README.md#npm-registry-authentication'
    )}) configured in the \`NPM_TOKEN\` environment variable must be a valid [token](https://docs.npmjs.com/getting-started/working_with_tokens) allowing to publish to the registry \`${registry}\`.

If you are using Two-Factor Authentication, make configure the \`auth-only\` [level](https://docs.npmjs.com/getting-started/using-two-factor-authentication#levels-of-authentication) is supported. **semantic-release** cannot publish with the default \`auth-and-writes\` level.

Please make sure to set the \`NPM_TOKEN\` environment variable in your CI with the exact value of the npm token.`,
  }),
  ENOPKGNAME: () => ({
    message: 'Missing `name` property in `package.json`.',
    details: `The \`package.json\`'s [name](https://docs.npmjs.com/files/package.json#name) property is required in order to publish a package to the npm registry.

Please make sure to add a valid \`name\` for your package in your \`package.json\`.`,
  }),
  ENOPKG: () => ({
    message: 'Missing `package.json` file.',
    details: `A [package.json file](https://docs.npmjs.com/files/package.json) at the root of your project is required to release on npm.

Please follow the [npm guideline](https://docs.npmjs.com/getting-started/creating-node-modules) to create a valid \`package.json\` file.`,
  }),
};
