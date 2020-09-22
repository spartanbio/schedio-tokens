const { getTokenName, generateTokenKey } = require('../utils');

const generateObject = ({ props, meta }) => {
  const tokenName = getTokenName(meta);

  return props.reduce((tokens, { name, value }) => ({
    ...tokens,
    [generateTokenKey(tokenName, name, str => str)]: value,
  }), {});
};

module.exports = (result) => {
  const js = result.toJS();
  const content = generateObject(js);

  return JSON.stringify(content, null, 2);
};
