module.exports = {
  '*.js': [
    'yarn lint:js --fix',
  ],
  '*.{css,scss}': [
    'yarn lint:style --fix',
  ],
}
