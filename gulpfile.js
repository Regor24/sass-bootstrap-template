const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const del = require('del');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const cssnano = require('gulp-cssnano');

const scssFiles = ['./assets/scss/**/*.scss'];

const pathStyleDest = './assets/css';

// SASS
gulp.task('style', function () {
  return gulp.src('./assets/scss/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer('last 4 version'))
    .pipe(sourcemaps.write())
    .on('error', onError)
    .pipe(gulp.dest(pathStyleDest));
});

gulp.task('style-build', function () {
  return gulp.src('./assets/scss/main.scss')
    .pipe(sass())
    .on('error', onError)
    .pipe(autoprefixer('last 4 version'))
    .pipe(cssnano())
    .pipe(gulp.dest(pathStyleDest));
});

// Watcher
gulp.task('watch', () => {
  gulp.watch(scssFiles, function(){
    runSequence('style', ['notify']);
  });
});

// Build for prod
gulp.task('build', function(callback) {
  runSequence(['style-build'], callback)
});

// Default
gulp.task('default', done => {
  runSequence(['style', 'watch'], done);
});

///////////////////////////////////////////////////////////
// Helpers
function onError(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('notify', function () {
  return gulp.src('')
    .pipe(notify({message: 'What time is it? Adventure time!', onLast: true}));
});
