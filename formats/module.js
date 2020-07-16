const { getTokenName, generateTokenKey } = require('../utils');

const generateExports = ({ props, meta }) => {
  const tokenName = getTokenName(meta);

  return props.map(({ name, value, comment }) => {
    const tokenKey = generateTokenKey(tokenName, name);
    const result = [];

    if (comment) result.push(`/* ${comment} */`);

    result.push(`export const ${tokenKey} = ${JSON.stringify(value, null, 2)};`);

    return result.join('\n');
  });
};

module.exports = (result) => {
  const js = result.toJS();
  const content = generateExports(js);
  const baseName = getTokenName(js.meta);

  return `\
/**
 * ${baseName === 'tokens' ? 'All' : baseName} tokens
 */

${content.join('\n')}
`;
};
