module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/gitlab',
      {
        assets: [
          { path: 'dist/**/*', label: 'tokens' },
          { path: 'public/**/*', label: 'docs' },
        ],
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
          'dist/',
        ],
      },
    ],
  ],
}
