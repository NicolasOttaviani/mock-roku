
var express = require("express"),
    bunyan = require ('bunyan'),

    midllewares = require ('./lib/middlewares'),
    guid = require ('./lib/guid.js'),
    routes = require('./routes');

var log = bunyan.createLogger({name: 'roku'});
var app = express();

app.use(midllewares.with(function (req, res, next){
  req.log = log.child({reqId: guid()});
  next();
}));

app.use(midllewares.errorHandler);

app.use ('/', routes)

var server = app.listen(3000, function () {
  log.info({'app': app}, "Server Listening");
});
