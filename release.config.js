module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      { preset: 'conventionalcommits' },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        path: [{ path: 'dist/json/tokens.raw.json', label: 'Token data' }],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'package.json',
          'yarn.lock',
          'CHANGELOG.md',
          'docs/',
        ],
      },
    ],
  ],
};
