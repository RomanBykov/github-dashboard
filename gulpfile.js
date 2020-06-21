const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const wait = require('gulp-wait');
// const csso = require('gulp-csso');
// const rename = require('gulp-rename');

gulp.task('css', function () {
  return gulp.src('src/sass/style.scss')
  .pipe(wait(1000))
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('src/css'))
  .pipe(server.stream());
  // .pipe(gulp.dest('markup/css'))
  // .pipe(csso())
  // .pipe(rename('style.min.css'))
  // .pipe(gulp.dest('markup/css'))
  // .pipe(gulp.dest('public/css'));
});

gulp.task('server', function () {
  server.init({
    server: 'src/'
  });

  gulp.watch('src/sass/**/*.scss', gulp.series('css'));
  gulp.watch('src/*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('css', 'server'));
