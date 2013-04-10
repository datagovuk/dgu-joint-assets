#!/usr/bin/env node

var path = require('path'),
    nodeWatch = require('nodewatch'),
    exec = require('child_process').exec;

var infile = path.join(__dirname, 'joint-ckan-drupal.less'),
    outfile = path.join(__dirname, 'joint-ckan-drupal.css');

function now() {
  return new Date().toISOString().replace('T', ' ').substr(0, 19);
}

function compile(event, filename) {
  var start = Date.now();

  exec('`npm bin`/lessc ' + infile + ' > ' + outfile+' --compress', function (err, stdout, stderr) {
    var duration = Date.now() - start;

    if (err) {
      console.log('An error occurred running the less command:');
      console.log(err.message);
    }
    else if (stderr || stdout) {
      console.log(stdout, stderr);
    } else {
      console.log('[%s] recompiled ' + filename + ' in %sms', now(), duration);
    }
  });
}

console.log('Watching %s', infile);
nodeWatch.add(infile).onChange(compile);
compile();
