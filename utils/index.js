const path = require('path')
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

const getTokenName = ({ file }) => path.basename(file, '.yml')
exports.getTokenName = getTokenName

const generateTokenKey = (category, name) => {
  let tokenKey = name.replace(`${category}-`, '')
  if (!isNaN(tokenKey)) tokenKey = category.split('-')[1] + '-' + tokenKey

  return _.camelCase(tokenKey)
}
exports.generateTokenKey = generateTokenKey
