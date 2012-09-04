
/*
 * GET home page.
 */
var upload = require('./upload.js');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.upload = upload;