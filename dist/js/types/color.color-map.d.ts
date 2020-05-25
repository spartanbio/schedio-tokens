declare enum ColorNames {
  turquoise,
  gold,
  ice,
  green,
  magenta,
  blue,
  night,
  grey,
  red,
  white,
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
  [hue: keyof typeof ColorNames]: Shades;
}

declare interface ColorMap extends ColorPalette {
  /* turquoise map */
  turquoise: {
    base: 'rgb(0, 180, 240)';

    darker: 'rgb(0, 69, 92)';

    dark: 'rgb(0, 122, 163)';

    light: 'rgb(71, 202, 245)';

    lighter: 'rgb(148, 224, 249)';
  };

  /* gold map */
  gold: {
    base: 'rgb(252, 186, 54)';

    darker: 'rgb(204, 129, 0)';

    dark: 'rgb(255, 170, 0)';

    light: 'rgb(253, 208, 119)';

    lighter: 'rgb(254, 226, 170)';
  };

  /* ice map */
  ice: {
    base: 'rgb(242, 245, 247)';
  };

  /* green map */
  green: {
    base: 'rgb(6, 137, 58)';

    darker: 'rgb(1, 60, 25)';

    dark: 'rgb(3, 99, 41)';

    light: 'rgb(25, 169, 83)';

    lighter: 'rgb(41, 214, 110)';
  };

  /* magenta map */
  magenta: {
    base: 'rgb(230, 0, 115)';

    darker: 'rgb(82, 0, 41)';

    dark: 'rgb(158, 0, 79)';

    light: 'rgb(250, 97, 173)';

    lighter: 'rgb(250, 178, 214)';
  };

  /* blue map */
  blue: {
    base: 'rgb(0, 76, 153)';

    dark: 'rgb(0, 36, 71)';

    light: 'rgb(0, 107, 214)';

    lighter: 'rgb(37, 138, 239)';

    lightest: 'rgb(100, 173, 247)';
  };

  /* night map */
  night: {
    base: 'rgb(33, 43, 54)';

    dark: 'rgb(14, 18, 22)';

    light: 'rgb(64, 84, 104)';

    lighter: 'rgb(98, 122, 147)';

    lightest: 'rgb(151, 168, 186)';
  };

  /* grey map */
  grey: {
    base: 'rgb(184, 194, 204)';

    darker: 'rgb(101, 117, 134)';

    dark: 'rgb(139, 153, 167)';

    light: 'rgb(214, 219, 225)';

    lighter: 'rgb(231, 235, 238)';
  };

  /* red map */
  red: {
    base: 'rgb(234, 16, 16)';

    darker: 'rgb(76, 5, 5)';

    dark: 'rgb(148, 10, 10)';

    light: 'rgb(244, 102, 102)';

    lighter: 'rgb(250, 179, 179)';
  };

  /* white map */
  white: {
    base: 'rgb(255, 255, 255)';
  };
}

declare const colors: ColorMap;
export = colors