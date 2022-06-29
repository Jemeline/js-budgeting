module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb'],
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 'off',
    'no-underscore-dangle': 0,
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
  },
};
