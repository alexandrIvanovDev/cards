module.exports = {
  extends: ['@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'i18next/no-literal-string': ['error', { markupOnly: true }]
  },
  plugins: ['i18next']
}