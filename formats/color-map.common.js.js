const { generateColorMap } = require('../utils');

module.exports = (result) => {
  const swatches = generateColorMap(result.toJS());

  return `module.exports = ${JSON.stringify(swatches, null, 2)}`;
};
