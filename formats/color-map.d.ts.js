const { generateColorMap } = require('../utils');

module.exports = (result) => {
  const js = result.toJS();
  const map = generateColorMap(js);

  const colorNames = Object.keys(map);

  const colors = Object.entries(map).map(([color, shades]) => {
    const shadeStr = Object.entries(shades)
      .map(([name, value]) => `    ${name}: '${value}';`)
      .join('\n\n');

    return `\
  /* ${color} map */
  ${color}: {
${shadeStr}
  };`;
  })
    .join('\n\n');

  return `\
declare interface ColorNames {
${colorNames.map(color => `  ${color},`).join('\n')}
}

declare interface Shades {
  darkest?: string;
  darker?: string;
  dark?: string;
  base: string;
  light?: string;
  lighter?: string;
  lightest?: string;
}

declare interface ColorPalette {
  [hue: keyof ColorNames]: Shades;
}

export declare interface ColorMap extends ColorPalette {
${colors}
}

declare const colors: ColorMap;
export = colors
`;
};
