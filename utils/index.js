exports.getShade = (name) => {
  const [, , shade] = name.split('-')
  return shade || 'base'
}
