# Schédio design tokens

Built with [Theo](https://github.com/salesforce-ux/theo) for
[@spartanbio/schedio](https://gitlab.com/spartanbio-ux/schedio).

A full list of tokens is available at https://spartanbio.github.io/schedio-tokens/.

- [Schédio design tokens](#schédio-design-tokens)
  - [Installation](#installation)
  - [Usage](#usage)
    - [JS](#js)
    - [SCSS](#scss)
    - [Flutter](#flutter)
    - [React Native](#react-native)
    - [Adobe Creative Cloud Applications](#adobe-creative-cloud-applications)

## Installation

```bash
yarn add @spartanbio/schedio-tokens
```

## Usage

Tokens are organized with the path structure `dist/<platform>/<language>/<token>.<format>.<ext>`

### JS

Common JS:

```js
// camelCase tokens
const schedioTokens = require('@spartanbio/schedio-tokens');
```

ES6 Modules:

```js
// camelCase tokens
import schedioTokens from '@spartanbio/scedio-tokens';
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

### Flutter

Only color swatches are supported at this time. Copy `dist/flutter/dart/color.color-swatches.dart` into your project.

### React Native

All CommonJS and ESModule tokens are available in `dist/react-native/`. Each includes TypeScript typings.

```js
// JS tokens
import schedioTokens from '@spartanbio/schedio-tokens/dist/react-native/module-js';
```

```ts
// TS interface
import { SchedioTokens } from '@spartanbio/schedio-tokens/dist/react-native/module-js';
```

### Adobe Creative Cloud Applications

CC applications that support swatch files can import `dist/web/adobe/color.ase` to use color. Note they are imported
without groups.
