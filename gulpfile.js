const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const theo = require('theo')
const transforms = require('./transforms/color')

const $ = gulpLoadPlugins()

// Setup and register custom formats/transforms
Object.entries(transforms).forEach(([name, { predicate, transform }]) => {
  theo.registerValueTransform(name, predicate, transform)
})

// Transforms
theo.registerTransform('flutter', ['color/dartHex8argb'])

// Formats
theo.registerFormat('map.scss', require('./formats/map.scss.js'))
theo.registerFormat('color-map.scss', require('./formats/color-map.scss.js'))
theo.registerFormat('color-swatches.dart', require('./formats/color-swatches.dart.js'))
theo.registerFormat('ase.json', require('./formats/ase.json.js'))

// Setup default `theo` formats
const webFormats = [
  { transformType: 'web', formatType: 'scss', language: 'scss' },
  { transformType: 'web', formatType: 'common.js', language: 'common-js' },
  { transformType: 'web', formatType: 'json', language: 'json' },
  { transformType: 'web', formatType: 'custom-properties.css', language: 'css' },
  { transformType: 'web', formatType: 'map.scss', language: 'scss' },
  { transformType: 'web', formatType: 'raw.json', language: 'raw-json' },
]

// Setup token-specific formats
const colorFormats = [
  { transformType: 'flutter', formatType: 'color-swatches.dart', language: 'dart' },
  { transformType: 'web', formatType: 'color-map.scss', language: 'scss' },
  { transformType: 'web', formatType: 'ase.json', language: 'adobe' },
]

// Build design system artifacts
gulp.task('web-formats', buildFormats(webFormats))
gulp.task('color-formats', buildFormats(colorFormats, 'tokens/colors.yml'))

// Build docs and styles
gulp.task('docs:styles', (done) => {
  gulp.src('docs/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass.sync({
        precision: 10,
      }).on('error', $.sass.logError),
    )
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('docs'))

  done()
})

gulp.task(
  'docs',
  gulp.series([
    'docs:styles',
    buildDocs,
  ]),
)

// Setup batched tasks
const defaultTasks = [
  'web-formats',
  'color-formats',
]

gulp.task(
  'default',
  gulp.series(defaultTasks),
)

const runOnWatch = [
  ...defaultTasks,
  'docs',
  gulp.series(serve, watch),
]

gulp.task(
  'watch',
  gulp.series(runOnWatch),
)

// Helpers for building design system
function buildFormats (formats, glob = 'tokens/*.yml', errorHandler = logError) {
  return (done) => {
    formats.forEach(({ transformType, formatType, language }) => {
      let destPath = `dist/${transformType}`

      if (language) destPath += `/${language}`

      gulp
        .src(glob)
        .pipe(
          $.theo({
            transform: { type: transformType },
            format: { type: formatType },
          }),
        )
        .on('error', errorHandler)
        .pipe(gulp.dest(destPath))
    })

    done()
  }
}

function buildDocs (done) {
  theo.registerFormat('docs.html', require('./formats/docs.html.js'))

  gulp.src('tokens/tokens.yml')
    .pipe(
      $.theo({
        transform: { type: 'web' },
        format: { type: 'docs.html' },
      }),
    )
    .pipe($.rename('index.html'))
    .on('error', logError)
    .pipe(gulp.dest('docs'))

  done()
}

function logError (err) {
  throw new Error(err)
}

// `gulp watch` setup
function watch () {
  gulp.watch(['tokens/*.yml'], gulp.series(runOnWatch))
  gulp.watch('docs/**/*.scss', gulp.series('docs:styles'))
  gulp.watch(['formats/**/*.*', 'gulpfile.js'], gulp.series($.restart))
  gulp.watch(['docs/**/*.html'], gulp.series(reload))
}

// BrowserSync setup
const browserSync = require('browser-sync')

function serve (done) {
  browserSync.init({
    open: false,
    notify: false,
    server: 'docs',
  })

  done()
}

function reload (done) {
  browserSync.reload()

  done()
}
