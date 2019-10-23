const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const glob = require('glob').sync;

const paths = {
  pages: ['./*.html'],
  images: ['./images/*']
};

/**********************************************************/
/* CSS / SCSS                                             */
/**********************************************************/

const style = () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
};

const buildStyle = () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([require('autoprefixer')(), require('cssnano')()]))
    .pipe(gulp.dest('./dist/css'));
};

/**********************************************************/
/* Javascript / Typescript                                */
/**********************************************************/

const bundle = () => {
  return browserify({
    basedir: '.',
    debug: true,
    entries: glob('./src/**/*.ts'),
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'));
};

const buildBundle = () => {
  return browserify({
    basedir: '.',
    debug: true,
    entries: glob('./src/**/*.ts'),
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
};

/**********************************************************/
/* Misc                                                   */
/**********************************************************/

const copyHtml = () => {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
};

const copyImages = () => {
  return gulp.src(paths.images).pipe(gulp.dest('dist/images'));
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  style();
  bundle();
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./src/**/*.ts', bundle);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./bundle.js').on('change', browserSync.reload);
};

/**********************************************************/
/* Exports                                                */
/**********************************************************/

exports.default = watch;
exports.build = gulp.series(copyHtml, copyImages, buildStyle, buildBundle);
