module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
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
        assets: [
          { path: 'dist/**/*', label: 'tokens' },
          { path: 'docs/**/*', label: 'docs' },
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
};
