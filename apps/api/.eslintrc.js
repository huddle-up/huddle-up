module.exports = {
  extends: ['../../.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Somehow this directive from the root eslintrc does not get loaded correctly
  },
  env: {
    node: true,
    jest: true,
  },
};
