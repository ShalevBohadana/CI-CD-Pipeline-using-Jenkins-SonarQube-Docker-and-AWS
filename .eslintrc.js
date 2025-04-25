// .eslintrc.js
/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  globals: {
    NodeJS: true,
    JSX: true
  },
  ignorePatterns: ['**/dist/', '**/build/', '**/node_modules/', '*.config.js', '*.config.ts'],
  overrides: [
    {
      files: ['*.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
