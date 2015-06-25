var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var fs = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
  require('./gulp/' + task);
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['ng*', 'gulp*', 'css']
  });
});

gulp.task('run',  ['watch:css', 'watch:js', 'nodemon']);