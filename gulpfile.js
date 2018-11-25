"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const log = require("fancy-log");

// start 'scss'
function scss() {
  return gulp
    .src("./scss/styles.scss")
    .pipe(sass({ includePaths: ["scss"] }))
    .on("error", log)
    .pipe(gulp.dest("./css"));
}

// start 'bs'
function bs() {
  // watch index.html & all .css and .js files
  return browserSync.init(["**/*.html", "**/*.css", "**/*.js"], {
    server: {
      baseDire: "./"
    },
    browser: "Firefox Developer Edition"
  });
}

// watch for changes to .scss files and rerun 'scss'
const watchAll = gulp.watch("./scss/*.scss", gulp.series(scss));

// start 'gulp'
gulp.task(
  "default",
  // combines 'scss' and 'bs'
  gulp.series(gulp.parallel(bs, scss), function() {
    // Not sure why this needs to be declared as a variable and can't just be inside this function?
    return watchAll;
  })
);
