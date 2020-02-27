const { getShade } = require('../utils')
const groupBy = require('lodash/groupBy')

class ColorSwatches {
  constructor ({ props }) {
    const propsWithPalette = props.reduce((palettes, prop) => {
      if (prop.type !== 'color') return palettes

      const [, color] = prop.name.split('-')
      prop.palette = color
      palettes.push(prop)

      return palettes
    }, [])

    this.palettes = groupBy(propsWithPalette, 'palette')
    this.colors = props.filter(prop => prop.type === 'color')
  }

  renderPalette (palette) {
    const props = this.palettes[palette]
    const _palette = palette.replace('spartan_', '')
    return `\
  /// ${_palette} and swatches
  static const SpartanColor ${_palette} = SpartanColor (_${_palette}PrimaryValue, <String, Color>{
    ${props.map(prop => `'${getShade(prop.name)}': Color(${prop.value}),`).join('\n    ')}
  });
  static const int _${_palette}PrimaryValue = ${props.find(prop => getShade(prop.name) === 'base').value};`
  }

  render () {
    return `\
import 'package:flutter/painting.dart';

class SpartanColor extends ColorSwatch<String> {
  const SpartanColor(int primary, Map<String, Color> swatch)
      : super(primary, swatch);
}

class SpartanColors {
  SpartanColors._();

${Object.keys(this.palettes).map(palettes => this.renderPalette(palettes))
.join('\n\n')}
}
`
  }
}

module.exports = function (result) {
  const swatches = new ColorSwatches(result.toJS())
  return swatches.render()
}
