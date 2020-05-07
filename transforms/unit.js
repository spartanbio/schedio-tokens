const {
  isRelativeSpacing,
  isAbsoluteSpacing,
  remToPx,
} = require('theo/lib/util')
const ms = require('ms')

// copied from 'theo/lib/util' as it's not exported
const convertRemToPx = (prop) => {
  const baseFontPercentage =
    typeof prop.getIn(['meta', 'baseFontPercentage']) === 'number'
      ? prop.getIn(['meta', 'baseFontPercentage'])
      : 100
  const baseFontPixel =
    typeof prop.getIn(['meta', 'baseFontPixel']) === 'number'
      ? prop.getIn(['meta', 'baseFontPixel'])
      : 16
  return remToPx(prop.get('value'), baseFontPercentage, baseFontPixel)
}

module.exports = {
  'unit/timingUnitless': {
    predicate: prop => prop.get('type') === 'time',
    transform: prop => prop.get('value') === 0 ? 0 : ms(prop.get('value')),
  },
  // React native units are prefixed with 'unit/rn'
  'unit/rnRelativePixelValue': {
    predicate: prop => isRelativeSpacing(prop.get('value')),
    transform: prop => Number(convertRemToPx(prop).replace(/px$/g, '')),
  },
  'unit/rnAbsolutePixelValue': {
    predicate: prop => isAbsoluteSpacing(prop.get('value')),
    transform: prop => Number(prop.get('value').replace(/px$/g, '')),
  },
}
