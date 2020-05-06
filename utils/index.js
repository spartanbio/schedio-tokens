const _ = require('lodash')

const getShade = (name) => {
  const [, , shade] = name.split('-')
  return shade || 'base'
}
exports.getShade = getShade

const generateColorMap = ({ props }) => {
  const hueGroups = _.groupBy(props, ({ name }) => _.camelCase(name.split('-')[1]))
  const colors = {}

  for (const hue in hueGroups) {
    colors[hue] = hueGroups[hue].reduce((shades, { name, value }) => ({
      ...shades,
      [getShade(name)]: value,
    }), {})
  }

  return colors
}
exports.generateColorMap = generateColorMap
