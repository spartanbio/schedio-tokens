# Schédio design tokens

Built for with [Theo](https://github.com/salesforce-ux/theo) for [@spartanbio/schedio](https://gitlab.com/spartanbio-ux/schedio).

## Installation

```bash
yarn add @spartanbio/schedio-tokens
```

## Usage

These formats can be applied to every type of token, not just the master list.

i.e.:

```js
// Importing raw colors from JSON
import { props as colors } from '@/spartanbio/schedio-tokens/dist/colors.raw.json';
```

### JS

Common JS:

```js
// camelCase tokens
const schedioTokens = require('@spartanbio/schedio-tokens');
// kebab-case tokens with meta data
const { props: schedioTokens } = require('@/spartanbio/schedio-tokens/dist/tokens.raw.json');
```

ES6 Modules:

```js
// camelCase tokens
import * as schedioTokens from '@spartnabio/scedio-tokens';
// kebab-case tokens with meta data
import { props as schedioTokens } from '@/spartanbio/schedio-tokens/dist/tokens.raw.json';
```

### SCSS

All variables and keys are kebab-case.

```scss
// All tokens as variables
@import '~@spartanbio/schedio/dist/tokens';

// All tokens as a map
@import '~@spartanbio/schedio/dist/tokens.map';

// All tokens as custom properties (works for CSS too)
@import '~@spartanbio/schedio/dist/tokens.custom-properties';

// Specific maps
@import '~@spartanbio/schedio/dist/colors.color-map';
```

### Adobe Creative Cloud Applications

CC applications that support swatch files can import `dist/colors.ase` to use colors. Note they are imported without groups.
