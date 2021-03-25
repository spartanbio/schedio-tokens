# Schédio design tokens

Built with [Theo](https://github.com/salesforce-ux/theo) for
[@spartanbio/schedio](https://gitlab.com/spartanbio-ux/schedio).

A full list of tokens is available at https://spartanbio.github.io/schedio-tokens/.

- [Schédio design tokens](#schédio-design-tokens)
  - [Installation](#installation)
  - [Usage](#usage)
    - [JS and Typescript](#js-and-typescript)
      - [React Native](#react-native)
    - [SCSS](#scss)
    - [Adobe Creative Cloud Applications](#adobe-creative-cloud-applications)

## Installation

```bash
yarn add @spartanbio/schedio-tokens
```

This package DOES NOT load brand fonts. To load them from Google Fonts, add the following line to your CSS:

```css
/* Customize accordingly to fit your needs. Inter Italic is not on google fonts and most be loaded separately. */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@300&display=swap');
```

## Usage

Tokens are available for the following platforms:

### JS and Typescript

Standard usage:

```js
// Fully typed for use in TS
import SchedioTokens from '@spartanbio/schedio-tokens';

const Tokens = new SchedioTokens();
const blue = Tokens.color('blue');
```

#### React Native

Simply import `nativeTokens` and pass it to `SchedioTokens`.

```js
// JS tokens
import SchedioTokens, { nativeTokens } from '@spartanbio/schedio-tokens';

const Tokens = new SchedioTokens(nativeTokens);
const blue = Tokens.color('blue');
```

```ts
// TS interface if needed
import { SchedioTokensNative } from '@spartanbio/schedio-tokens';
```

### SCSS

All variables and keys are kebab-case. Paths below rely on alias resolution and assume `~` has been aliased to
`node_modules`.

```scss
// All variables, tokens, and utility functions
@use '~@spartanbio/schedio-tokens/scss/schedio-tokens';

// All tokens as variables and maps
@use '~@spartanbio/schedio/dist/scss/all-tokens';

// Unprefixed maps of specific token categories
@use '~@spartanbio/schedio/dist/scss/<token-category>.map';

// All tokens as custom properties (works for CSS too)
@use '~@spartanbio/schedio/dist/css/<token-category>.custom-properties';
```

> `@import` has been deprecated by SASS. Avoid using it in favour of `@use`.

### Adobe Creative Cloud Applications

CC applications that support swatch files can import `dist/adobe/color.ase` to use color. Note they are imported without
groups.
