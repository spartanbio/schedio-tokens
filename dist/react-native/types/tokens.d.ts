/**
 * TokensTokens
 */
declare interface Tokens {
  borderRadiusSmall: 4;
  borderRadiusBase: 8;
  borderRadiusCircle: '50%';
  borderWidthBase: 1;
  borderWidthThick: 2;
  borderWidthThickest: 4;
  colorTurquoiseLight: 'rgb(71, 202, 245)';
  colorGoldLighter: 'rgb(254, 226, 170)';
  colorIce: 'rgb(242, 245, 247)';
  colorGreenLight: 'rgb(25, 169, 83)';
  colorMagentaDark: 'rgb(158, 0, 79)';
  colorBlue: 'rgb(0, 76, 153)';
  colorNightLighter: 'rgb(98, 122, 147)';
  colorGoldDarker: 'rgb(204, 129, 0)';
  colorGreyDarker: 'rgb(101, 117, 134)';
  colorRed: 'rgb(234, 16, 16)';
  colorMagentaLight: 'rgb(250, 97, 173)';
  colorRedDarker: 'rgb(76, 5, 5)';
  colorGrey: 'rgb(184, 194, 204)';
  colorGold: 'rgb(252, 186, 54)';
  colorGreenDark: 'rgb(3, 99, 41)';
  colorTurquoiseDark: 'rgb(0, 122, 163)';
  colorTurquoiseLighter: 'rgb(148, 224, 249)';
  colorBlueLight: 'rgb(0, 107, 214)';
  colorNight: 'rgb(33, 43, 54)';
  colorNightLightest: 'rgb(151, 168, 186)';
  colorGreenLighter: 'rgb(41, 214, 110)';
  colorRedLight: 'rgb(244, 102, 102)';
  colorMagentaDarker: 'rgb(82, 0, 41)';
  colorGreyLight: 'rgb(214, 219, 225)';
  colorGoldLight: 'rgb(253, 208, 119)';
  colorNightDark: 'rgb(14, 18, 22)';
  colorMagentaLighter: 'rgb(250, 178, 214)';
  colorTurquoise: 'rgb(0, 180, 240)';
  colorGreenDarker: 'rgb(1, 60, 25)';
  colorNightLight: 'rgb(64, 84, 104)';
  colorGreen: 'rgb(6, 137, 58)';
  colorGoldDark: 'rgb(255, 170, 0)';
  colorBlueLightest: 'rgb(100, 173, 247)';
  colorTurquoiseDarker: 'rgb(0, 69, 92)';
  colorGreyDark: 'rgb(139, 153, 167)';
  colorBlueLighter: 'rgb(37, 138, 239)';
  colorRedDark: 'rgb(148, 10, 10)';
  colorRedLighter: 'rgb(250, 179, 179)';
  colorMagenta: 'rgb(230, 0, 115)';
  colorWhite: 'rgb(255, 255, 255)';
  colorGreyLighter: 'rgb(231, 235, 238)';
  colorBlueDark: 'rgb(0, 36, 71)';
  durationNone: 0;
  durationFast: 100;
  durationBase: 200;
  durationSlow: 300;
  durationSlower: 400;
  durationSlowest: 500;
  easingBase: [
  0.64,
  0,
  0.35,
  1
];
  easingEaseIn: [
  0.36,
  0,
  1,
  1
];
  easingEaseOut: [
  0,
  0,
  0.42,
  1
];
  easingExcite: [
  0.18,
  0.67,
  0.6,
  1.22
];
  easingOvershoot: [
  0.07,
  0.28,
  0.32,
  1.22
];
  easingAnticipate: [
  0.38,
  -0.4,
  0.88,
  0.65
];
  fontFamilySansSerif: "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  fontFamilyMonospaced: "'SFMono-Regular', Consolas, 'Fira Sans', 'Liberation Mono', Menlo, 'Courier New', Courier, monospace";
  fontSizeBase: 16;
  fontSize1: 80;
  fontSize2: 54;
  fontSize3: 36;
  fontSize4: 24;
  fontSize5: 16;
  fontSize6: 12;
  fontSize7: 8;
  fontWeightBold: 700;
  fontWeightDemi: 600;
  fontWeightLight: 300;
  fontWeightRegular: 400;
  lineHeightBase: '150%';
  lineHeightLargeText: '125%';
  /* Shadow values are intended to be used with colors added to them */
  shadowBorder: {
  'shadowOffset': {
    'width': 0;
    'height': 0;
  };
  'shadowRadius': 1;
};
  /* Shadow values are intended to be used with colors added to them */
  shadowLight: {
  'shadowOffset': {
    'width': 0;
    'height': 4;
  };
  'shadowRadius': 16;
};
  /* Shadow values are intended to be used with colors added to them */
  shadowBase: {
  'shadowOffset': {
    'width': 0;
    'height': 4;
  };
  'shadowRadius': 16;
};
  /* Shadow values are intended to be used with colors added to them */
  shadowHeavy: {
  'shadowOffset': {
    'width': 0;
    'height': 8;
  };
  'shadowRadius': 24;
};
  spacingNone: 0;
  spacingQuarter: 4;
  spacingTriple: 48;
  spacingLoose: 24;
  spacingTight: 12;
  spacingQuadruple: 64;
  spacingDouble: 32;
  spacingBase: 16;
  spacingHalf: 8;
}

declare const tokens: Tokens;
export = tokens;
