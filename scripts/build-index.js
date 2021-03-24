const { readdir, outputFile } = require('fs-extra');
const path = require('path');
const { camelCase, upperFirst } = require('lodash');
const chalk = require('chalk');

const BASE_DIR = path.resolve(__dirname, '../dist');

/**
 * Create indexes for JS/TS files
 * @param dir Directory to create index files in
 */
async function writeIndexes (dir = '') {
  return Promise.all([
    outputFile(path.resolve(BASE_DIR, dir, 'index.js'), await es6Index(dir)),
    outputFile(path.resolve(BASE_DIR, dir, 'index.d.ts'), await tsIndex(dir)),
  ]);
}

Promise.all([
  writeIndexes('react-native'),
  writeIndexes(),
  writeScssIndex(),
])
  .then(() => console.log(chalk.green('Index files written')))
  .catch(err => console.error(chalk.red(err)));

/**
 * Creates a map of import names and paths
 * @param ext The file extension to include in the index
 * @param dir path to directory where index should be generated
 */
async function getImportMap (ext, dir = '') {
  const files = await readdir(path.resolve(BASE_DIR, dir));

  const tokens = files
    .filter(file => !file.includes('tokens') && !file.includes('index') && file.includes(ext))
    .map((file) => {
      const fileName = file.replace(ext, '');
      const parts = fileName.split('.');
      const [token, suffix] = parts;
      const name = camelCase(parts.length >= 2 ? suffix : token);
      const filePath = fileName;
      return [name, filePath];
    });

  return tokens;
};

/**
 * Create ES Module index.js
 * @param dir path to directory where index should be generated
 */
async function es6Index (dir = '') {
  const importMap = await getImportMap('.js', dir);

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
 * Create TypeScript index.d.ts
 * @param dir path to directory where index should be generated
 */
async function tsIndex (dir = '') {
  const importMap = await getImportMap('.d.ts', dir);

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

/** Write SCSS index */
async function writeScssIndex () {
  const scssDir = path.resolve(BASE_DIR, 'scss');
  const files = await readdir(scssDir);
  const body = files.map(file => `@import '${file.replace('.scss', '')}';\n`).join('');

  return outputFile(path.resolve(scssDir, 'all-tokens.scss'), body);
}
