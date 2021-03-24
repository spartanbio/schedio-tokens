// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

const groupBy = require('lodash/groupBy');
const camelCase = require('lodash/camelCase');
const upperfirst = require('lodash/upperFirst');
const tinycolor = require('tinycolor2');

const byPropName = (a, b) => a.name.localeCompare(b.name);
const parseNameIndex = name => parseInt(name.split('-').pop(), 10);
const byPropNameIndex = (a, b) => parseNameIndex(a.name) > parseNameIndex(b.name) ? 1 : -1;
const byValue = (a, b) => parseFloat(a.value) > parseFloat(b.value) ? 1 : -1;
class Styleguide {
  constructor ({ props, options }) {
    this.options = options;
    this.categories = groupBy([...props].sort(byPropName), 'category');
  }

  renderRowHeader (id, heading) {
    return `
<thead>
  <tr id=${id}>
    <th scope="col">${heading}</th>
    <th scope="col">Value</th>
    <th scope="col">Examples</th>
    <th scope="col">Usage</th>
  </tr>
</thead>
`;
  }

  renderRow (prop, example) {
    return `
<tr>
  <th scope="row">
    <code>${prop.name}</code>
  </th>
  <td>
    <code>${prop.value}</code>
  </td>
  ${example}
  <td>${prop.comment ? prop.comment : ''}</td>
</tr>
`;
  }

  renderSpacing (props) {
    const _props = [...props].sort(byValue);
    return _props.map((prop) => {
      const example = `
<td>
  <div
    class="metric-box"
    style="width: ${prop.value}; height: ${prop.value};"
  ></div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderSizing (props) {
    return props.map((prop) => {
      const example = `
<td>
  <div
    class="metric-box"
    style="width: ${prop.value}; height: ${prop.value};"
  ></div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderFont (props) {
    return props.map((prop) => {
      const example = `
<td>
  <div style="font-family: ${prop.value};">
    The quick brown fox jumps over the lazy dog.
  </div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderFontStyle (props) {
    return props.map((prop) => {
      const example = `
<td>
  <div style="font-style: ${prop.value};">
    The quick brown fox jumps over the lazy dog.
  </div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderFontWeight (props) {
    const _props = [...props].sort(byValue);
    return _props.map((prop) => {
      const example = `
<td>
  <div style="font-weight: ${prop.value};">
    The quick brown fox jumps over the lazy dog.
  </div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderFontSize (props) {
    const _props = [...props].sort(byPropNameIndex);
    return _props.map((prop) => {
      const lineHeight = parseFloat(prop.value.replace('rem', '')) >= 3 ? 1.25 : 1.5;
      const example = `
<td>
  <div style="font-size: ${prop.value}; line-height: ${lineHeight};">
    The quick brown fox jumps over the lazy dog.
  </div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderLineHeight (props) {
    return props.map((prop) => {
      const vHeight = !isNaN(prop.value) ? `${prop.value}em` : prop.value;
      const example = `
<td>
  <div
    class="line-height-example"
    style="line-height: ${prop.value}; background-size: 100% ${vHeight};"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
    elementum odio et lacus rutrum molestie. Nunc arcu enim, elementum
    id feugiat at, venenatis quis erat.
  </div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderFontFamily (props) {
    return props.map((prop) => {
      const example = `
<td>
  <div style="font-family: ${prop.value};">
    The quick brown fox jumps over the lazy dog.
  </div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderBorderStyle (props) {
    return props.map((prop) => {
      const example = `<td style="border: ${prop.value};"></td>`;
      return this.renderRow(prop, example);
    });
  }

  renderBorderColor (props) {
    return props.map((prop) => {
      const color = tinycolor(prop.value);
      prop.value = color.getAlpha() < 1 ? color : color.toHexString(prop.value);
      const example = `<td style="border: 2px solid ${prop.value};"></td>`;
      return this.renderRow(prop, example);
    });
  }

  renderHrColor (props) {
    return props.map((prop) => {
      const color = tinycolor(prop.value);
      prop.value = color.getAlpha() < 1 ? color : color.toHexString(prop.value);
      const example = `
<td>
  <hr style="border-top-color: ${prop.value};" />
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderRadius (props) {
    return props.map((prop) => {
      const example = `
<td>
  <div
    class="radius-box ${prop.name}"
    style="border-radius: ${prop.value};"
  ></div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderBorderRadius (props) {
    return props.map((prop) => {
      const example = `
<td>
  <div
    class="radius-box"
    style="border-radius: ${prop.value};"
  ></div>
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderBackgroundColor (props) {
    return props.map((prop) => {
      const color = tinycolor(prop.value);
      prop.value = color.getAlpha() < 1 ? color : color.toHexString(prop.value);
      // eslint-disable-next-line max-len
      const example = `<td style="background-color: ${prop.value}; border: 1px solid #f6f6f6;"></td>`;
      return this.renderRow(prop, example);
    });
  }

  renderGradient (props) {
    return props.map((prop) => {
      const example = `<td style="background: ${prop.value};"></td>`;
      return this.renderRow(prop, example);
    });
  }

  renderBackgroundGradient (props) {
    return props.map((prop) => {
      const example = `<td style="background-image: ${prop.value};"></td>`;
      return this.renderRow(prop, example);
    });
  }

  renderDropShadow (props) {
    return props.map((prop) => {
      const example = `<td style="box-shadow: ${prop.value};"></td>`;
      return this.renderRow(prop, example);
    });
  }

  renderBoxShadow (props) {
    return props.map((prop) => {
      const example = `<td style="box-shadow: ${prop.value};"></td>`;
      return this.renderRow(prop, example);
    });
  }

  renderTextColor (props) {
    return props.map((prop) => {
      const color = tinycolor(prop.value);
      prop.value = color.getAlpha < 1 ? color : color.toHexString(prop.value);
      const example = `
<td style="background-color: #f6f6f6; color: ${prop.value};">
  The quick brown fox jumps over the lazy dog.
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderTextShadow (props) {
    return props.map((prop) => {
      const example = `
<td style="text-shadow: ${prop.value};">
  The quick brown fox jumps over the lazy dog.
</td>
`;
      return this.renderRow(prop, example);
    });
  }

  renderTime (props) {
    props = props.sort(byValue);
    return props.map((prop) => {
      const example = '<td></td>';
      return this.renderRow(prop, example);
    });
  }

  renderEasing (props) {
    props = props.sort(byPropName);
    return props.map((prop) => {
      const example = '<td></td>';
      return this.renderRow(prop, example);
    });
  }

  renderMediaQuery (props) {
    return props.map((prop) => {
      const example = '<td></td>';
      return this.renderRow(prop, example);
    });
  }

  renderSection (type, heading, fn) {
    const props = this.categories[type];
    if (!props) {
      return '';
    }
    const name = upperfirst(camelCase(type));
    const render = typeof fn === 'function' ? fn : this[`render${name}`];
    return `
<section>
  <table>
    ${this.renderRowHeader(type, heading)}
    <tbody>
      ${render
        .call(this, props)
        .join('')
        .trim()}
    </tbody>
  </table>
  <hr />
</section>
`;
  }

  render () {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta
    http-equiv="X-UA-Compatible"
    content="IE=edge"
  />
  <title>Design Tokens</title>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css"
  />
  <link
    rel="stylesheet"
    href="styles.css"
  />
</head>

<body>
  <header
    role="banner"
    class="banner"
  >
    <div class="container">
      <h1>Design Tokens</h1>
    </div>
  </header>
  <div class="container container--card">
    <main role="main">
      ${this.renderSection('sizing', 'Sizing')}
      ${this.renderSection('spacing', 'Spacing')}
      ${this.renderSection('font', 'Fonts')}
      ${this.renderSection('font-style', 'Font Styles')}
      ${this.renderSection('font-weight', 'Font Weights')}
      ${this.renderSection('font-size', 'Font Sizes')}
      ${this.renderSection('line-height', 'Line Heights')}
      ${this.renderSection('font-family', 'Font Families')}
      ${this.renderSection('border-style', 'Border Styles')}
      ${this.renderSection('border-color', 'Border Colors')}
      ${this.renderSection('radius', 'Radius')}
      ${this.renderSection('border-radius', 'Border Radii')}
      ${this.renderSection('hr-color', 'Horizontal Rule Colors')}
      ${this.renderSection('background-color', 'Background Colors')}
      ${this.renderSection('gradient', 'Gradients')}
      ${this.renderSection(
      'background-gradient',
      'Background Gradients',
    )}
      ${this.renderSection('drop-shadow', 'Drop Shadows')}
      ${this.renderSection('box-shadow', 'Box Shadows')}
      ${this.renderSection(
      'inner-shadow',
      'Inner Drop Shadows',
      this.renderDropShadow,
    )}
      ${this.renderSection('text-color', 'Text Colors')}
      ${this.renderSection('text-shadow', 'Text Shadows')}
      ${this.renderSection('time', 'Time')}
      ${this.renderSection('easing', 'Easing')}
      ${this.renderSection('media-query', 'Media Queries')}
    </main>
  </div>
</body>

</html>
`;
  }
}

module.exports = (result) => {
  const styleguide = new Styleguide(result.toJS());
  return styleguide.render();
};
