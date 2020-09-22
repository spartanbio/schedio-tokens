const _ = require('lodash');
const { getTokenName, generateTokenKey } = require('../utils');

const generateObject = ({ props, meta }) => {
  const tokenName = getTokenName(meta);

  return props.map(({ name, value, comment }) => {
    const tokenKey = generateTokenKey(tokenName, name);
    const result = [];

    if (comment) result.push(`  /* ${comment} */`);

    result.push(`  ${tokenKey}: ${JSON.stringify(value, null, 2)};`);

    return result.join('\n');
  });
};

module.exports = (result) => {
  const js = result.toJS();
  const content = generateObject(js);
  const baseName = _.flow(_.camelCase, _.upperFirst)(getTokenName(js.meta));

  return `\
/**
 * ${baseName === 'tokens' ? '' : baseName}Tokens
 */
export declare interface ${baseName} {
${content.join('\n')}
}

declare const tokens: ${baseName};

export default tokens;
`;
};
