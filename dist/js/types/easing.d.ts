/**
 * EasingTokens
 */
declare interface Easing {
  base: [
  0.64,
  0,
  0.35,
  1
],
  easeIn: [
  0.36,
  0,
  1,
  1
],
  easeOut: [
  0,
  0,
  0.42,
  1
],
  excite: [
  0.18,
  0.67,
  0.6,
  1.22
],
  overshoot: [
  0.07,
  0.28,
  0.32,
  1.22
],
  anticipate: [
  0.38,
  -0.4,
  0.88,
  0.65
],
}

declare const tokens: Easing;
export = tokens;
