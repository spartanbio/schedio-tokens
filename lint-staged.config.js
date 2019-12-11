module.exports = {
  '*.js': [
    'yarn lint:js',
    'git add',
  ],
  '*.{css,scss}': [
    'yarn lint:style',
    'git add',
  ],
}
