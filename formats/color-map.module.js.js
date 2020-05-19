const { generateColorMap } = require('../utils')

module.exports = (result) => {
  const swatches = generateColorMap(result.toJS())

  const colors = Object.entries(swatches)
    .map(([hue, shade]) => `\
/** Color ${hue} */
export const ${hue} = ${JSON.stringify(shade, null, 2)}
`)
    .join('\n')

  return colors
}
