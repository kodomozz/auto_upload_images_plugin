var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var Q = require('q');
var tempfile = require('tempfile');

var noImg = 'No image data found on the clipboard!';

module.exports = function () {
  var deferred = Q.defer();
  if (process.platform !== 'darwin') {
    deferred.reject(new Error('upload clipboard only support mac'));
  }
  var pngpath = tempfile('.png');
  var execPath = path.join(__dirname, 'pngpaste');
  exec(execPath + ' ' + pngpath, function (err, stdout, stderr) {
    if (err) {
      if (err.message.indexOf(noImg) >= 0) {
        return deferred.reject(new Error(noImg));
      }
      return deferred.reject(err);
    }
    if (!fs.statSync(pngpath)) {
      return deferred.reject(new Error('get clipboard image error'));
    }

    deferred.resolve(pngpath);
  });

  return deferred.promise;
}