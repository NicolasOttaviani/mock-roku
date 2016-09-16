
var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    spawn = require('child_process').spawn,
    node;

var env = Object.create( process.env );
env.DEBUG = 'roku*';

var src = ['./index.js', './lib/**.js', './routes/**.js'];
var test = ['./test/**/*.js'];

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('serve', function() {
  killProcess(node);
  node = spawn('node', ['index.js', ''], {stdio: 'inherit', env: env})
  node.on('close', onCloseProcess('node'));
});

/**
 * $ gulp test
 * description: launch jasmine.
 */
gulp.task('test', function() {
  gulp.src(test, {read: false})
		  .pipe(mocha());
});

/**
 * $ gulp continius-serve
 * description: relaunch the server on file changes.
 */
gulp.task('continius-serve', function() {
 gulp.watch(src, ['serve']);
});

/**
 * $ gulp continius-test
 * description: relaunch the server on file changes.
 */
gulp.task('continius-test', function() {
 gulp.watch(test.concat(src), ['test']);
});

/**
 * $ gulp
 * description: start the server continiusly.
 */
gulp.task('default', ['serve', 'continius-serve']);

/**
 * $ gulp tdd
 * description: start the server tdd process continiusly.
 */
gulp.task('tdd', ['test', 'continius-test']);



// clean up if an error goes unhandled.
process.on('exit', function() {
  killProcess(node);
});

process.on('uncaughtException', function(e) {
  console.log('uncaughtException', e.stack);
});

function onCloseProcess (process){
  return function (code){
    if (code === 8) {
      console.log('Error detected on '+process+', waiting for changes...');
    }
  }
}

function killProcess (process){
  if (process){
    process.kill();
  }
}
