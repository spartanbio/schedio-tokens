const path = require('path');

class TokenMap {
  constructor ({ meta, props }) {
    const _label = path.basename(meta.file, '.yml');
    console.log(_label);
    this.label = _label === 'colors' ? 'color' : _label;
    this.props = props;
  }

  _formatProp (prop) {
    return `'${prop.name.replace(this.label + '-', '')}': (${prop.value})`;
  }

  render () {
    return `\
$${this.label}-data: (
  ${this.props.map(this._formatProp.bind(this)).join(',\n  ')}
);
`;
  }
}

module.exports = result => new TokenMap(result.toJS()).render();
