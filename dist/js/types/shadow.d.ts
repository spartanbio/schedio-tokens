/**
 * ShadowTokens
 */
declare interface Shadow {
  /* Shadow values are intended to be used with colors added to them */
  border: '0 0 1px';
  /* Shadow values are intended to be used with colors added to them */
  light: '0 0.25rem 1rem';
  /* Shadow values are intended to be used with colors added to them */
  base: '0 0.25rem 1rem';
  /* Shadow values are intended to be used with colors added to them */
  heavy: '0 0.5rem 1.5rem 0.25rem';
}

declare const tokens: Shadow;
export = tokens;
