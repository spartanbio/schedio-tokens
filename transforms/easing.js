const functionRegExp = /.*\((.*)\)/;

module.exports = {
  'easing/array': {
    predicate: prop => prop.get('category') === 'easing' && prop.get('type') === 'function',
    transform: prop => prop
      .get('value')
      .match(functionRegExp)[1]
      .split(',')
      .map(el => Number(el.trim())),
  },
};
