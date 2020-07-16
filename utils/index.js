const path = require('path');
const _ = require('lodash');

const getShade = (name) => {
  const [, , shade] = name.split('-');
  return shade || 'base';
};
exports.getShade = getShade;

const generateColorMap = ({ props }) => {
  /** Enforce shade order */
  const shadeOrder = (a, b) => {
    const shades = [
      'darkest',
      'darker',
      'dark',
      'light',
      'lighter',
      'lightest',
    ];
    const aShade = getShade(a.name);
    const bShade = getShade(b.name);

    return shades.indexOf(aShade) > shades.indexOf(bShade) ? 1 : -1;
  };

  const hueGroups = _.groupBy(props, ({ name }) => _.camelCase(name.split('-')[1]));
  const colors = {};

  for (const hue in hueGroups) {
    if (Object.prototype.hasOwnProperty.call(hueGroups, hue)) {
      colors[hue] = hueGroups[hue]
        .sort(shadeOrder)
        .reduce((shades, { name, value }) => ({
          ...shades,
          [getShade(name)]: value,
        }), {});
    }
  }

  return colors;
};
exports.generateColorMap = generateColorMap;

const getTokenName = ({ file }) => path.basename(file, '.yml');
exports.getTokenName = getTokenName;

const generateTokenKey = (category, name, renameMethod = _.camelCase) => {
  let tokenKey = name.replace(`${category}-`, '');
  if (!isNaN(tokenKey)) tokenKey = category.split('-')[1] + '-' + tokenKey;

  return renameMethod(tokenKey);
};
exports.generateTokenKey = generateTokenKey;
