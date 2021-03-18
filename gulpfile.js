const { dest, src, series, watch } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const theo = require('theo');
const transforms = {
  ...require('./transforms/color'),
  ...require('./transforms/unit'),
  ...require('./transforms/easing'),
};

const $ = gulpLoadPlugins();

// Setup and register custom formats/transforms
Object.entries(transforms).forEach(([name, { predicate, transform }]) => {
  theo.registerValueTransform(name, predicate, transform);
});

// Transforms
const jsTransforms = [
  'color/rgb',
  'unit/timingUnitless',
  'easing/array',
];
theo.registerTransform('js', jsTransforms);
theo.registerTransform('flutter', ['color/dartHex8argb']);
theo.registerTransform('react-native', [
  ...jsTransforms,
  'unit/rnRelativePixelValue',
  'unit/rnAbsolutePixelValue',
  'unit/rnRelativeShadow',
  'unit/rnAbsoluteShadow',
  'unit/percentLineHeight',
]);

// Formats
// Overridden formats
theo.registerFormat('json', require('./formats/json.js'));
theo.registerFormat('map.scss', require('./formats/map.scss.js'));
theo.registerFormat('common.js', require('./formats/common.js'));
theo.registerFormat('module.js', require('./formats/module.js'));
// Custom formats
theo.registerFormat('color-map.scss', require('./formats/color-map.scss.js'));
theo.registerFormat('d.ts', require('./formats/d.ts.js'));
theo.registerFormat('color-map.d.ts', require('./formats/color-map.d.ts.js'));
theo.registerFormat('color-map.common.js', require('./formats/color-map.common.js.js'));
theo.registerFormat('color-map.module.js', require('./formats/color-map.module.js.js'));
theo.registerFormat('color-swatches.dart', require('./formats/color-swatches.dart.js'));
theo.registerFormat('ase.json', require('./formats/ase.json.js'));

// Setup default `theo` formats
const webFormats = [
  { transformType: 'web', formatType: 'scss', language: 'scss' },
  { transformType: 'web', formatType: 'json', language: 'json' },
  { transformType: 'web', formatType: 'custom-properties.css', language: 'css' },
  { transformType: 'web', formatType: 'map.scss', language: 'scss' },
  { transformType: 'web', formatType: 'raw.json', language: 'raw-json' },
  { transformType: 'js', formatType: 'd.ts', language: 'types' },
  { transformType: 'js', formatType: 'common.js', language: 'common-js' },
  { transformType: 'js', formatType: 'module.js', language: 'module-js' },
];

const mobileFormats = [
  { transformType: 'react-native', formatType: 'd.ts', language: 'types' },
  { transformType: 'react-native', formatType: 'common.js', language: 'common-js' },
  { transformType: 'react-native', formatType: 'module.js', language: 'module-js' },
];

// Setup token-specific formats
const colorFormats = [
  { transformType: 'web', formatType: 'color-map.scss', language: 'scss' },
  { transformType: 'web', formatType: 'ase.json', language: 'adobe' },
  { transformType: 'js', formatType: 'color-map.d.ts', language: 'types' },
  { transformType: 'js', formatType: 'color-map.common.js', language: 'common-js' },
  { transformType: 'js', formatType: 'color-map.module.js', language: 'module-js' },
  { transformType: 'flutter', formatType: 'color-swatches.dart', language: 'dart' },
  { transformType: 'react-native', formatType: 'color-map.module.js', language: 'module-js' },
  { transformType: 'react-native', formatType: 'color-map.common.js', language: 'common-js' },
  { transformType: 'react-native', formatType: 'color-map.d.ts', language: 'types' },
];

// Build docs and styles
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

// Helpers for building design system
function buildFormats (formats, glob = 'tokens/*.yml', errorHandler = logError) {
  return function (done) {
    formats.forEach(({ transformType, formatType, language }) => {
      let destPath = `dist/${transformType}`;

      if (language) {
        destPath += `/${language}`;
      }

      src(glob)
        .pipe(
          $.theo({
            transform: { type: transformType },
            format: { type: formatType },
          }),
        )
        .on('error', errorHandler)
        .pipe(dest(destPath));
    });

    done();
  };
}

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

function logError (err) {
  throw new Error(err);
}

const docTasks = series(
  docStyles,
  buildDocs,
);

// BrowserSync setup
const browserSync = require('browser-sync');

function serve (done) {
  browserSync.init({
    open: false,
    server: 'docs',
  });
  done();
}

function reload (done) {
  browserSync.reload();
  done();
}

const defaultTasks = series(
  buildFormats(webFormats),
  buildFormats(mobileFormats),
  buildFormats(colorFormats, 'tokens/color.yml'),
);

// `gulp watch` setup
function watchFn (done) {
  watch(['tokens/*.yml'], series(
    defaultTasks,
    docTasks,
  ));
  watch('docs/**/*.scss', series(docStyles));
  watch(['docs/**/*.html'], series(reload));
  done();
}

module.exports = {
  default: series(defaultTasks),
  docs: docTasks,
  watch: series(defaultTasks, serve, watchFn),
};
