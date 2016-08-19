const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css'); 
const cache = require('gulp-cached');
const fs = require('fs');
const rename = require('gulp-rename');


const paths = {
  sass: "./src/**/*.scss",
  js: "./src/js/**/*.js",
  html: "./src/*.html"
}

gulp.task('convertjs', function(){

    return gulp.src(paths.js)
            
            .pipe(cache('jscache'))
            .pipe(gulp.dest('./demo/js'))
            .pipe(uglify())
          //  .pipe(browserify({insertGlobals: true}))
            .pipe(rename("GitBar.js"))
            .pipe(gulp.dest('./dist'));
});
gulp.task('converthtml', function(){
    return gulp.src(paths.html)
            .pipe(cache('htmlcache'))
            .pipe(gulp.dest('./demo'))
});

gulp.task('watchjs', ['convertjs'], function(){browserSync.reload();});
gulp.task('watchhtml', ['converthtml'], function(){browserSync.reload();});

gulp.task('convertcss', function(){
  return sass(paths.sass)
          .on('error', sass.logError)
          .pipe(cache('csscache'))
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(gulp.dest('./demo/css'))
          .pipe(browserSync.stream())
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
});

gulp.task('watch', function(){
  
  gulp.watch(paths.js, ['watchjs']);
  gulp.watch(paths.sass, ['convertcss']);
  gulp.watch(paths.html, ['watchhtml']);
  

  
});

gulp.task('run', ['browser-sync', 'watch']);
