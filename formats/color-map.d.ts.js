const _ = require('lodash')
const { generateColorMap } = require('../utils')

module.exports = (result) => {
  const js = result.toJS()
  const content = generateColorMap(js)

  const colors = Object.entries(content)
    .map(([hue, shade]) => `\
/** ${_.upperFirst(hue)}ColorMap */
export declare interface ${_.upperFirst(hue)}ColorMap {
${Object.entries(shade)
        .map(([name, value]) => `  ${name}: ${JSON.stringify(value)},`)
        .join('\n')}
}
`)
    .join('\n')

  return colors
}
