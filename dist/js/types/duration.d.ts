/**
 * DurationTokens
 */
declare interface Duration {
  none: 0,
  fast: 100,
  base: 200,
  slow: 300,
  slower: 400,
  slowest: 500,
}

declare const tokens: Duration;
export = tokens;
