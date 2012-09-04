
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
    ,UserProvider = require('./modules/UserProvider').UserProvider
  , path = require('path');



var express = require("express");
var app = express();
var userProvider = new UserProvider('localhost', 27017);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.post('/user',function(req,res){
    userProvider.save(req,res,function(item){
    });
});

app.get('/getAllUser',function(req,res){
    userProvider.find(req,function(item){
         res.send(item);
    });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);


//app.get('/upload', routes.upload.ss);
app.post('/upload', routes.upload.ss);

app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
