// This enables ESLint to use dependencies of this config
// (see https://github.com/eslint/eslint/issues/3458)
require('eslint-config-molindo/setupPlugins');

module.exports = {
  extends: 'molindo/javascript',
  env: {
    node: true,
    jest: true
  }
};
