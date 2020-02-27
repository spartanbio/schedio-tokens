
const tinycolor = require('tinycolor2')

const isType = type => prop => prop.get('type') === type

const toColor = prop => tinycolor(prop.get('value'))

module.exports = {
  'color/dartHex8argb': {
    predicate: isType('color'),
    transform: prop => '0x' + toColor(prop).toHex8String()
      .replace(/^#(.{6})(.{2})/, '$2$1')
      .toUpperCase(),
  },
}
