# Schédio design tokens

Built with [Theo](https://github.com/salesforce-ux/theo) for
[@spartanbio/schedio](https://gitlab.com/spartanbio-ux/schedio).

A full list of tokens is available at https://spartanbio.github.io/schedio-tokens/.

- [Schédio design tokens](#schédio-design-tokens)
  - [Installation](#installation)
  - [Usage](#usage)
    - [JS](#js)
      - [React Native](#react-native)
    - [SCSS](#scss)
    - [Adobe Creative Cloud Applications](#adobe-creative-cloud-applications)

## Installation

```bash
yarn add @spartanbio/schedio-tokens
```

## Usage

Tokens are organized with the path structure `dist/<platform>/<language>/<token>.<format>.<ext>`

### JS

Standard usage:

```js
import SchedioTokens from '@spartanbio/schedio-tokens';

const Schedio = new SchedioTokens();
const blue = Schedio.color('blue');
```

#### React Native

All CommonJS and ESModule tokens are available in `dist/react-native/`. Each includes TypeScript typings.

```js
// JS tokens
import SchedioTokens, { nativeTokens } from '@spartanbio/schedio-tokens';

const Schedio = new SchedioTokens(nativeTokens);
const blue = Schedio.color('blue');
```

```ts
// TS interface if needed
import { SchedioTokensNative } from '@spartanbio/schedio-tokens';
```

### SCSS

All variables and keys are kebab-case.

```scss
// All tokens as variables
@import '~@spartanbio/schedio/dist/web/scss/tokens';

// All tokens as a map
@import '~@spartanbio/schedio/dist/web/scss/tokens.map';

// All tokens as custom properties (works for CSS too)
@import '~@spartanbio/schedio/dist/web/css/tokens.custom-properties';

// Unprefixed maps of specific token categories
@import '~@spartanbio/schedio/dist/web/scss/<token-category>.map';

// Colors, grouped by hue
@import '~@spartanbio/schedio/dist/web/scss/color.color-map';
```

### Adobe Creative Cloud Applications

CC applications that support swatch files can import `dist/web/adobe/color.ase` to use color. Note they are imported
without groups.
