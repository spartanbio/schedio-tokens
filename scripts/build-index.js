const { readdir, outputFile } = require('fs-extra');
const path = require('path');
const { camelCase, upperFirst } = require('lodash');
const { default: chalk } = require('chalk');

const BASE_DIR = path.resolve(__dirname, '../dist');

/**
 * Create indexes for JS/TS files
 * @param dir Directory to create index files in
 */
async function writeIndexes (dir) {
  const typesIndex = `\
import tokens, { SchedioTokens } from '../types';

export {
  SchedioTokens,
};

export default tokens;
`;

  return Promise.all([
    outputFile(path.resolve(BASE_DIR, dir, 'module-js', 'index.js'), await es6Index(dir)),
    outputFile(path.resolve(BASE_DIR, dir, 'common-js', 'index.js'), await commonIndex(dir)),
    outputFile(path.resolve(BASE_DIR, dir, 'types', 'index.d.ts'), await tsIndex(dir)),
    outputFile(path.resolve(BASE_DIR, dir, 'module-js', 'index.d.ts'), typesIndex),
    outputFile(path.resolve(BASE_DIR, dir, 'common-js', 'index.d.ts'), typesIndex),
  ]);
}

Promise.all([
  writeIndexes('react-native'),
  writeIndexes('js'),
])
  .then(() => console.log(chalk.green('Index files written')))
  .error(err => console.error(chalk.red(err)));

/**
 * Creates a map of import names and paths
 * @param dir path to directory where index should be generated
 */
async function getImportMap (dir) {
  const files = await readdir(path.resolve(BASE_DIR, dir));

  const tokens = files
    .filter(file => !file.includes('tokens') && !file.includes('index'))
    .map((file) => {
      const parts = file.split('.');
      const [token, suffix] = parts;
      const name = camelCase(parts.length >= 4 ? suffix : token);
      const filePath = file.replace(/(\.d\.ts)|\.js/, '');

      return [name, filePath];
    });

  return tokens;
};

/**
 * Create ES Module index.js
 * @param dir path to directory where index should be generated
 */
async function es6Index (dir) {
  const importMap = await getImportMap(dir + '/module-js');

  const imports = importMap.map(([name, filePath]) => `\
import * as ${name} from './${filePath}';
`).join('');

  const exports = importMap.map(([name]) => `\
  ${name},
`).join('');

  return `\
${imports}
export default {
${exports}\
};
`;
}

/**
 * Create CommonJS index.js
 * @param dir path to directory where index should be generated
 */
async function commonIndex (dir) {
  const importMap = await getImportMap(dir + '/common-js');

  const body = importMap.map(([name, filePath]) => `\
  ${name}: require('./${filePath}'),
`).join('');

  return `\
module.exports = {
${body}\
};
`;
}

/**
 * Create TypeScript index.d.ts
 * @param dir path to directory where index should be generated
 */
async function tsIndex (dir) {
  const importMap = await getImportMap(dir + '/types');

  const imports = importMap.map(([name, filePath]) => `\
import { ${upperFirst(name)} } from './${filePath}';
`).join('');

  return `\
${imports}\

export interface SchedioTokens {
${importMap.map(([name]) => `\
  ${name}: ${upperFirst(name)};
`).join('')}\
}

const tokens: SchedioTokens;

export default tokens;
`;
};
