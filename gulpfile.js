const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const theo = require('theo')

const $ = gulpLoadPlugins()

// Setup default `theo` formats
const webFormats = [
  { transformType: 'web', formatType: 'scss' },
  { transformType: 'web', formatType: 'common.js' },
  { transformType: 'web', formatType: 'json' },
  { transformType: 'web', formatType: 'custom-properties.css' },
  { transformType: 'web', formatType: 'map.scss' },
  { transformType: 'web', formatType: 'raw.json' },
]

// Setup and register custom formats
theo.registerFormat('color-map.scss', require('./formats/color-map.scss.js'))
theo.registerFormat('ase.json', require('./formats/ase.json.js'))

const colorFormats = [
  { transformType: 'web', formatType: 'color-map.scss' },
  { transformType: 'web', formatType: 'ase.json' },
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
    formats.forEach(({ transformType, formatType }) => {
      gulp
        .src(glob)
        .pipe(
          $.theo({
            transform: { type: transformType },
            format: { type: formatType },
          }),
        )
        .on('error', errorHandler)
        .pipe(gulp.dest('dist'))
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
