module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
  overrides: [
    {
      files: ['*.jsx', '*.js'],
      rules: {
        'react/prop-types': 'off',
        'import/prefer-default-export': 'off',
        'object-curly-newline': 'off',
        'operator-linebreak': 'off',
        'function-paren-newline': 'off',
      },
    },
  ],
};
