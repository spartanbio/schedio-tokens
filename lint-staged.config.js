module.exports = {
  '*.{js,ts}': [
    'yarn eslint --fix',
  ],
  '*.{css,scss}': [
    'yarn stylelint --fix',
  ],
};
