module.exports = {
  '*.js': [
    'yarn lint:js --fix',
    'git add',
  ],
  '*.{css,scss}': [
    'yarn lint:style --fix',
    'git add',
  ],
}
