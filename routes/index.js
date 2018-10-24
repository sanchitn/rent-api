var fs = require('fs'),
  validFileTypes = ['js'];

var requireFiles = function (directory, app) {
  fs.readdirSync(directory).forEach(function (fileName) {
    
    if (fs.lstatSync(directory + '/' + fileName).isDirectory()) {
      requireFiles(directory + '/' + fileName, app);
    } else {
      if (fileName === 'index.js' && directory === __dirname) return;
      if (validFileTypes.indexOf(fileName.split('.').pop()) === -1) return;
      require(directory + '/' + fileName)(app);
    }
  })
}

 module.exports = function (app) {
  requireFiles(__dirname, app);
}