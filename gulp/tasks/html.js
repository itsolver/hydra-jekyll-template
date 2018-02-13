'use strict';
var argv       = require('yargs').argv;
var critical   = require('critical').stream;
var gulp       = require('gulp');
var htmlmin    = require('gulp-htmlmin');
var prettyData = require('gulp-pretty-data');
var size       = require('gulp-size');
var when       = require('gulp-if');

// include paths file
var paths      = require('../paths');

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies HTML files for production
gulp.task('html', () => {
  return gulp.src(paths.siteFolderName + paths.htmlPattern)
    .pipe(when(argv.prod, htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: false,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeEmptyElements: true,
      removeRedundantAttributes: true,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(when(argv.prod, size({title: 'optimized HTML'})))
    .pipe(when(argv.prod, gulp.dest(paths.siteFolderName)))
});

// 'gulp xml' -- does nothing
// 'gulp xml' --prod'  -- minifies XML and JSON files for production
gulp.task('xml', () => {
  return gulp.src(paths.siteFolderName + paths.xmlPattern)
    .pipe(when(argv.prod, prettyData({
      type: 'minify',
      preserveComments: false
    })))
    .pipe(when(argv.prod, size({title: 'optimized XML'})))
    .pipe(when(argv.prod, gulp.dest(paths.siteFolderName)))
});

// Page dimensions for critical CSS
var pageDimensions = [{
                        width: 320,
                        height: 480
                      }, {
                        width: 768,
                        height: 1024
                      }, {
                        width: 1024,
                        height: 1024
                      }, {
                        width: 1440,
                        height: 1280
                      }];

// 'gulp styles:critical:archive' -- extract layout.archive critical CSS
//   into /_includes/critical-archive.css
gulp.task('styles:critical:archive', () => {
  return gulp.src(paths.tempDir  + paths.siteDir + 'archived/index.html')
    .pipe(critical({
      base: paths.tempDir,
      inline: false,
      css: [paths.sassFilesTemp + '/main.css'],
      dimensions: pageDimensions,
      dest: paths.sourceDir + paths.includesFolderName + '/critical-archive.css',
      minify: true,
      extract: false,
      ignore: ['@font-face'] // defer loading of webfonts
    }))
});

// 'gulp styles:critical:post' -- extract layout.post critical CSS
//   into /_includes/critical-post.css
gulp.task('styles:critical:post', () => {
  return gulp.src(paths.tempDir  + paths.siteDir + 'blog/index.html')
    .pipe(critical({
      base: paths.tempDir,
      inline: false,
      css: [paths.sassFilesTemp + '/main.css'],
      dimensions: pageDimensions,
      dest: paths.sourceDir + paths.includesFolderName + '/critical-post.css',
      minify: true,
      extract: false,
      ignore: ['@font-face'] // defer loading of webfonts
    }))
});

// 'gulp styles:critical:home' -- extract layout.home critical CSS
//   into /_includes/critical-home.css
gulp.task('styles:critical:home', () => {
  return gulp.src(paths.tempDir  + paths.siteDir + 'index.html')
    .pipe(critical({
      base: paths.tempDir,
      css: [paths.sassFilesTemp + '/main.css'],
      dimensions: pageDimensions,
      dest: paths.sourceDir + paths.includesFolderName + '/critical-home.css',
      minify: true,
      extract: false,
      ignore: ['@font-face]'] // defer loading of webfonts
    }))
});
