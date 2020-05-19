const {
  isRelativeSpacing,
  isAbsoluteSpacing,
  remToPx,
} = require('theo/lib/util')
const ms = require('ms')

// copied from 'theo/lib/util' as it's not exported
const convertRemToPx = (prop) => {
  const baseFontPercentage = prop.getIn && typeof prop.getIn(['meta', 'baseFontPercentage']) === 'number'
    ? prop.getIn(['meta', 'baseFontPercentage'])
    : 100
  const baseFontPixel = prop.getIn && typeof prop.getIn(['meta', 'baseFontPixel']) === 'number'
    ? prop.getIn(['meta', 'baseFontPixel'])
    : 16

  return remToPx(prop.get ? prop.get('value') : prop, baseFontPercentage, baseFontPixel)
}

const isBoxShadow = prop => prop === 'box-shadow'
const replacePx = str => str.replace(/px$/g, '')
const generateShadow = (width, height, radius) => ({
  shadowOffset: { width, height },
  ...(radius && { shadowRadius: radius }),
})

module.exports = {
  'unit/timingUnitless': {
    predicate: prop => prop.get('type') === 'time',
    transform: prop => prop.get('value') === 0 ? 0 : ms(prop.get('value')),
  },
  // React native units are prefixed with 'unit/rn'
  'unit/rnRelativePixelValue': {
    predicate: prop => isRelativeSpacing(prop.get('value')) && !isBoxShadow(prop.get('category')),
    transform: prop => Number(convertRemToPx(prop).replace(/px$/g, '')),
  },
  'unit/rnAbsolutePixelValue': {
    predicate: prop => isAbsoluteSpacing(prop.get('value')) && !isBoxShadow(prop.get('category')),
    transform: prop => Number(prop.get('value').replace(/px$/g, '')),
  },
  'unit/rnRelativeShadow': {
    predicate: prop => isRelativeSpacing(prop.get('value')) && isBoxShadow(prop.get('category')),
    transform: prop => generateShadow(
      ...prop.get('value')
        .split(' ')
        .map(convertRemToPx)
        .map(replacePx)
        .map(Number),
    ),
  },
  'unit/rnAbsoluteShadow': {
    predicate: prop => isAbsoluteSpacing(prop.get('value')) && isBoxShadow(prop.get('category')),
    transform: prop => generateShadow(
      ...prop.get('value')
        .split(' ')
        .map(replacePx)
        .map(Number),
    ),
  },
}
