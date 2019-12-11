const tinycolor = require('tinycolor2')

module.exports = (result) => {
  const { props } = result.toJS()
  const colorProps = props.filter(({ type }) => type === 'color')
  const colors = colorProps.map(({ name, value }) => ({
    name,
    model: 'RGB',
    type: 'global',
    color: rgbToArray(value),
  }))

  return JSON.stringify({
    version: '1.0',
    groups: [],
    colors,
  })
}

function rgbToArray (input) {
  const { r, g, b } = tinycolor(input).toRgb()

  return [r / 255, g / 255, b / 255]
}
