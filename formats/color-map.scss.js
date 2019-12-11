const groupBy = require('lodash/groupBy')

const getShade = (name) => {
  const shade = name.split('-').pop()
  return shade === name ? 'base' : shade
}

class ColorMap {
  constructor ({ props }) {
    const propsWithPalette = props.reduce((palettes, prop) => {
      if (prop.type !== 'color') return palettes

      prop.palette = prop.name.split('-').shift()
      palettes.push(prop)

      return palettes
    }, [])

    this.palettes = groupBy(propsWithPalette, 'palette')
    this.colors = props.filter(prop => prop.type === 'color')
  }

  renderPalette (palette) {
    const props = this.palettes[palette]
    return `'${palette}': (\n${props
      // `    ` formats indent
      .map(prop => `    '${getShade(prop.name)}': ${prop.value}`)
      .join(',\n')}
  )`
  }

  render () {
    return `$palettes: (\n  ${Object.keys(this.palettes)
      .map(palettes => this.renderPalette(palettes))
      // `\n  ` formats indent
      .join(',\n  ')}
);
`
  }
}

module.exports = function (result) {
  const colorMap = new ColorMap(result.toJS())
  return colorMap.render()
}
