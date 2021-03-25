const { dest, src, series, watch } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const merge2 = require('merge2');
const theo = require('theo');
const transforms = {
  ...require('./transforms/unit'),
  ...require('./transforms/easing'),
};
const exec = require('child_process').exec;

const $ = gulpLoadPlugins();

// TRANSFORMS
Object.entries(transforms).forEach(([name, { predicate, transform }]) => {
  theo.registerValueTransform(name, predicate, transform);
});

const jsTransforms = [
  'color/rgb',
  'unit/timingUnitless',
  'easing/array',
];
theo.registerTransform('js', jsTransforms);
theo.registerTransform('react-native', [
  ...jsTransforms,
  'unit/rnRelativePixelValue',
  'unit/rnAbsolutePixelValue',
  'unit/rnRelativeShadow',
  'unit/rnAbsoluteShadow',
  'unit/percentLineHeight',
]);

// FORMATS
// Overridden formats
theo.registerFormat('json', require('./formats/json.js'));
theo.registerFormat('map.scss', require('./formats/map.scss.js'));
theo.registerFormat('js', require('./formats/module.js'));
// Custom formats
theo.registerFormat('color-map.scss', require('./formats/color-map.scss.js'));
theo.registerFormat('d.ts', require('./formats/d.ts.js'));
theo.registerFormat('color-map.d.ts', require('./formats/color-map.d.ts.js'));
theo.registerFormat('color-map.js', require('./formats/color-map.js.js'));
theo.registerFormat('ase.json', require('./formats/ase.json.js'));

// Setup default `theo` formats
/**
 * @typedef FormatData
 * @prop {string} transformType
 * @prop {string} formatType
 * @prop {string} [language]
 */

/** @type {FormatData[]} */
const webFormats = [
  { transformType: 'web', formatType: 'scss', language: 'scss' },
  { transformType: 'web', formatType: 'json', language: 'json' },
  { transformType: 'web', formatType: 'custom-properties.css', language: 'css' },
  { transformType: 'web', formatType: 'map.scss', language: 'scss' },
  { transformType: 'web', formatType: 'raw.json', language: 'json' },
  { transformType: 'web', formatType: 'js' },
  { transformType: 'web', formatType: 'd.ts' },
];

/** @type {FormatData[]} */
const mobileFormats = [
  { transformType: 'react-native', formatType: 'd.ts', language: 'react-native' },
  { transformType: 'react-native', formatType: 'js', language: 'react-native' },
];

// Setup token-specific formats
/** @type {FormatData[]} */
const colorFormats = [
  { transformType: 'web', formatType: 'color-map.scss', language: 'scss' },
  { transformType: 'web', formatType: 'ase.json', language: 'adobe' },
  { transformType: 'web', formatType: 'color-map.js' },
  { transformType: 'web', formatType: 'color-map.d.ts' },
  { transformType: 'react-native', formatType: 'color-map.js', language: 'react-native' },
  { transformType: 'react-native', formatType: 'color-map.d.ts', language: 'react-native' },
];

/**
 * Error handler for gulp
 * @param {Error} err The error
 */
function logError (err) {
  throw new Error(err);
}

// TASK FUNCTIONS
// Token tasks
/**
 * Generates tasks for token formats
 * @param {FormatData[]}} formats Theo formats to build
 * @param {string} glob Glob pattern to match
 * @param {Function} errorHandler
 * @returns {NodeJS.ReadWriteStream}
 */
function prepareTokenBuilders (formats, glob = 'tokens/*.yml', errorHandler = logError) {
  return formats.map(({ transformType, formatType, language }) => {
    let destPath = 'dist/';

    if (language) {
      destPath += language;
    }

    return src(glob)
      .pipe(
        $.theo({
          transform: { type: transformType },
          format: { type: formatType },
        }),
      )
      .on('error', errorHandler)
      .pipe(dest(destPath));
  });
}

/**
 * Compiles all tokens into their final formats
 * @returns {merge2.Merge2Stream} Merged gulp tasks
 */
function buildTokens () {
  return merge2(
    prepareTokenBuilders(webFormats),
    prepareTokenBuilders(mobileFormats),
    prepareTokenBuilders(colorFormats, 'tokens/color.yml'),
  );
}

// Doc tasks
/**
 * Compile sass for documentation
 * @returns {NodeJS.ReadWriteStream}
 */
function docStyles () {
  return src('docs/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass.sync({
        precision: 10,
      }).on('error', $.sass.logError),
    )
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('docs'));
}

/**
 * Lint docs css output
 * @param {import('gulp').TaskFunctionCallback} done Gulp callback
 */
function lintDocStyles (done) {
  exec('yarn stylelint --fix ./docs/**/*.css', (err, stdout, stderr) => {
    if (stderr) console.log(stderr);
    done(err);
  });
}

/**
 * Build documentation
 * @returns {NodeJS.ReadWriteStream}
 */
function buildDocs () {
  theo.registerFormat('docs.html', require('./formats/docs.html.js'));

  return src('tokens/tokens.yml')
    .pipe(
      $.theo({
        transform: { type: 'web' },
        format: { type: 'docs.html' },
      }),
    )
    .pipe($.rename('index.html'))
    .on('error', logError)
    .pipe(dest('docs'));
}

const docTasks = [
  docStyles,
  lintDocStyles,
  buildDocs,
];

// `browser-sync` setup
/**
 * Initiate `browser-sync` server
 * @param {import('gulp').TaskFunctionCallback} done Gulp callback
 */
function serve (done) {
  browserSync.init({
    open: false,
    server: 'docs',
  });
  done();
}

/**
 * Reload `browser-sync` server
 * @param {import('gulp').TaskFunctionCallback} done Gulp callback
 */
function reload (done) {
  browserSync.reload();
  done();
}

/**
 * Gulp watcher
 * @param {import('gulp').TaskFunctionCallback} done Gulp callback
 */
function watchTokens (done) {
  watch(['tokens/*.yml'], series(buildTokens));
  watch(['dist/'], series(docTasks));
  watch(['docs/**/*.scss'], series(docStyles, lintDocStyles));
  watch(['docs/'], series(reload));
  done();
}

module.exports = {
  default: series(buildTokens),
  docs: series(docTasks),
  watch: series(buildTokens, docTasks, serve, watchTokens),
};
