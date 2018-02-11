// To Do: after deploy to firebase, run gulp.task 'submit:sitemap'
// cloned from https://github.com/mmistakes/made-mistakes-jekyll/blob/master/gulpfile.js
// modified from generator-jekyllized 1.0.0-rc.6
'use strict';
var gulp       = require('gulp');
var requireDir = require('require-dir');
var tasks      = requireDir('./gulp/tasks', {recurse: true}); // eslint-disable-line
const shell    = require('gulp-shell');

// include paths file
var paths      = require('./gulp/paths');

// 'gulp build:site' -- copies, replaces rev'd references, builds, and then copies it again
gulp.task('build:site', gulp.series('site:tmp', 'site', 'copy:site'));

// 'gulp assets' -- removes assets and rebuilds them
// 'gulp assets --prod' -- same as above but with production settings
gulp.task('assets', gulp.series(
  gulp.series('scripts', 'styles', 'fonts', 'icons'),
  gulp.series('scripts:gzip', 'styles:gzip', 'images:lazyload', 'images:feature', 'copy:assets', 'copy:images', 'copy:icons', 'copy:manifest')
));

// 'gulp clean' -- removes assets and gzipped files
gulp.task('clean', gulp.parallel('clean:assets', 'clean:gzip', 'clean:dist', 'clean:site'));

// 'gulp build' -- same as 'gulp' but doesn't serve site
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', gulp.series('clean', 'assets', 'build:site', 'html', 'xml'));

// 'gulp critical' -- builds critical path CSS includes
//   WARNING: run this after substantial CSS changes
//   WARNING: .html files referenced need to exist, run after `gulp build` to ensure.
//gulp.task('critical', gulp.series('styles:critical:home', 'styles:critical:archive', 'styles:critical:post')); // BEFORE TO DO: Create layouts for home, archive and past with critical css
gulp.task('critical', gulp.series('styles:critical:home'));

// 'gulp rebuild' -- WARNING: removes all assets, images, and built site
gulp.task('rebuild', gulp.series('clean', 'clean:images'));

// 'gulp check' -- checks your Jekyll site for errors
gulp.task('check', gulp.series('site:check'));

// 'gulp' -- removes assets and gzipped files, creates assets and revs version
//   in includes or layouts, builds site, serves site
// 'gulp --prod' -- same as above but with production settings
gulp.task('default', gulp.series('build', 'serve'));

// 'gulp submit' -- submit sitemap XML to Google and Bing
gulp.task('submit', gulp.series('submit:sitemap'));
