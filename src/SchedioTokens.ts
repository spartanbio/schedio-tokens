import webTokens, { SchedioTokens as SchedioTokensWeb } from '../dist';
import nativeTokens, { SchedioTokens as SchedioTokensNative } from '../dist/react-native';

type Base = 'base';

export default class SchedioTokens<Tokens extends (SchedioTokensWeb | SchedioTokensNative) = SchedioTokensWeb> {
  // This makes typescript assign the type properly
  tokensData: {
    [key in keyof Tokens]: Tokens[key]
  };

  constructor (tokens = webTokens as Tokens) {
    this.tokensData = tokens;
  }

  /** Get border radius */
  borderRadius<R extends keyof Tokens['borderRadius'] = Base> (
    radius: R | Base = 'base',
  ): Tokens['borderRadius'][R] {
    return this.tokensData.borderRadius[radius as R];
  }

  /** Get border width */
  borderWidth<T extends keyof Tokens['borderWidth'] = Base> (
    width: T | Base = 'base',
  ): Tokens['borderWidth'][T] {
    return this.tokensData.borderWidth[width as T];
  }

  /**
   * Get a color by hue and shade
   * @returns RGB color string (e.g.: `rgb(255,255,255)`)
   */
  color<Hue extends keyof Tokens['colorMap'], Shade extends keyof Tokens['colorMap'][Hue]> (
    hue: Hue,
    shade: Shade | Base = 'base',
  ): Tokens['colorMap'][Hue][Shade] {
    return this.tokensData.colorMap[hue][shade as Shade];
  }

  /** Get transition duration in milliseconds */
  duration<T extends keyof Tokens['duration'] = Base> (time: T | Base = 'base'): Tokens['duration'][T] {
    return this.tokensData.duration[time as T];
  }

  /**
   * Get bezier easing parameters
   * @returns `[x1, y1, x2, y2]`
   */
  easing<T extends keyof Tokens['easing'] = Base> (variant: T | Base = 'base'): Tokens['easing'][T] {
    return this.tokensData.easing[variant as T];
  }

  /** Get font size */
  fontSize<T extends keyof Tokens['fontSize'] = Base> (size: T | Base = 'base'): Tokens['fontSize'][T] {
    return this.tokensData.fontSize[size as T];
  }

  /** Get numeric font weight */
  fontWeight<T extends keyof Tokens['fontWeight']> (weight: T): Tokens['fontWeight'][T] {
    return this.tokensData.fontWeight[weight];
  }

  /** Get font stack */
  font<T extends keyof Tokens['font']> (font: T): Tokens['font'][T] {
    return this.tokensData.font[font];
  }

  /** Get percentage line height */
  lineHeight<T extends keyof Tokens['lineHeight'] = Base> (
    height: T | Base = 'base',
  ): Tokens['lineHeight'][T] {
    return this.tokensData.lineHeight[height as T];
  }

  /** Get shadow data */
  shadow<Variant extends keyof Tokens['shadow'] = Base> (
    variant: Variant | Base = 'base',
  ): Tokens['shadow'][Variant | Base] {
    return this.tokensData.shadow[variant];
  }

  /** Get spacing value */
  spacing<T extends keyof Tokens['spacing'] = Base> (size: T | Base = 'base'): Tokens['spacing'][T] {
    return this.tokensData.spacing[size as T];
  }
}

export {
  webTokens,
  nativeTokens,
  SchedioTokensWeb,
  SchedioTokensNative,
};
