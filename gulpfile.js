var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var watchify    = require('watchify');
var prefix      = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({server: "./src"});
  gulp.watch("src/styles/sass/**/*.scss", ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("src/styles/sass/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(prefix(['ie > 6', 'Chrome >= 25', 'Safari >= 5', 'Opera >= 11', 'Firefox > 3']))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
