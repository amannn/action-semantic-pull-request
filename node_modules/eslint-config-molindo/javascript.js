const confusingBrowserGlobals = require('confusing-browser-globals');
const config = require('./config');

const ERROR = 'error';
const OFF = 'off';

module.exports = {
  parser: 'babel-eslint',

  plugins: ['import', 'prettier', 'unicorn'],

  settings: {
    'import/resolver': 'node'
  },

  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],

  rules: {
    'array-callback-return': ERROR,
    'arrow-body-style': [ERROR, 'as-needed'],
    curly: [ERROR, 'multi-line'],
    'dot-notation': ERROR,
    eqeqeq: [ERROR, 'always', {null: 'ignore'}],
    'func-names': [ERROR, 'as-needed'],
    // See discussion in https://github.com/molindo/eslint-config-molindo/issues/27
    'func-style': [ERROR, 'declaration', {allowArrowFunctions: false}],
    'import/newline-after-import': ERROR,
    'import/no-unresolved': [ERROR, {commonjs: true}],
    'import/no-named-as-default': OFF,
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: config.testFiles.concat(
          'webpack.config.js',
          '.eslintrc.js'
        )
      }
    ],
    'import/order': [
      ERROR,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'never',
        alphabetize: {order: 'asc'}
      }
    ],
    'no-console': [ERROR, {allow: ['warn', 'error']}],
    'no-restricted-globals': [ERROR].concat(confusingBrowserGlobals),
    'no-restricted-syntax': [
      ERROR,
      {
        selector: 'ForInStatement',
        message:
          'for … in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries} and iterate over the resulting array. Iteration based on arrays usually shows the intent of the loop clearer and works better with chaining. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods'
      }
    ],
    'no-shadow': ERROR,
    'no-throw-literal': ERROR,
    'no-unneeded-ternary': ERROR,
    'no-unused-expressions': ERROR,
    'no-use-before-define': [ERROR, {functions: false}],
    'no-var': ERROR,
    'object-shorthand': ERROR,
    'prefer-arrow-callback': ERROR,
    'prefer-const': ERROR,
    'prettier/prettier': [
      ERROR,
      {singleQuote: true, bracketSpacing: false, trailingComma: 'none'}
    ],
    'unicorn/explicit-length-check': ERROR,
    'unicorn/import-index': ERROR,
    'unicorn/no-abusive-eslint-disable': ERROR,
    'valid-jsdoc': [
      ERROR,
      {
        prefer: {
          returns: 'return'
        },
        preferType: {
          array: 'Array',
          boolean: 'Boolean',
          function: 'Function',
          number: 'Number',
          string: 'String',
          object: 'Object',
          any: '*',
          Any: '*',
          Undefined: 'undefined',
          Null: 'null'
        },
        requireReturn: false,
        requireReturnType: false,
        requireParamDescription: false,
        requireReturnDescription: false
      }
    ]
  }
};
