module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['xo', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'arrow-body-style': 'off',
    'new-cap': 'off',
    'no-throw-literal': 'off',
    'no-useless-catch': 'off',
    'no-await-in-loop': 'off',
    camelcase: 'off',
    'capitalized-comments': 'off',
  },
}
