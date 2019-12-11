module.exports = {
  branch: 'master',
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
        // eslint-disable-next-line no-template-curly-in-string
        message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
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
