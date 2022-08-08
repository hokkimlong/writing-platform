module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'prettier'],
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      1,
      {
        jsxSingleQuote: true,
        singleQuote: true,
        bracketSpacing: true,
        endOfLine: 'auto',
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    'no-console': 0,
    'linebreak-style': 0,
    'import/no-unresolved': 0,
    'no-underscore-dangle': [2, { allow: ['_id'] }],
    'no-tabs': 'off',
    'max-len': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-param-reassign': 'off',
  },
};
