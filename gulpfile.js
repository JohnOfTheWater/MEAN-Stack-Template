var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer'),
    reload = browserSync.reload,
    bundle = require('gulp-react-bundle');

//path
var path = {
  js: 'public/js/**/*.js',
  scss: {
    folder: 'public/scss',
    main: 'public/scss/app.scss'
  },
  css: 'public/css'
}

gulp.task('sass', function() {
  gulp.src( path.scss.main )
    .pipe(plumber())
    .pipe(sass({
      lineNumbers: true,
      style: 'expanded',
      trace: true
    }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(prefix(["last 10 versions", "> 1%", "BlackBerry 10", "Android 2"], {
      cascade: true
    }))
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function() {
  bundle('./public/js/react/react.js', './public/js');
});

gulp.task('default', function() {
  gulp.watch(path.scss.folder + "/**/*.scss", ['sass']);
  //gulp.watch(path.js, ['js']);
});
