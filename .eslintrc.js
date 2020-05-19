module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    '@spartanbio',
  ],
  overrides: [
    {
      files: [
        '**/*.ts',
      ],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
      ],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        '@spartanbio',
      ],
      rules: {
        semi: ['error', 'always'],
      },
    },
  ],
}
