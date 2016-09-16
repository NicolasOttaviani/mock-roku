var express = require("express")
  , bunyan = require ('bunyan')
  , util = require('util')
  , ssdpServerFactory = require('./lib/ssdp-server-factory')
  , midllewares = require ('./lib/middlewares')
  , myUtil = require ('./lib/my-util.js')
  , routes = require('./routes');

var httpPort = 3000;
var htppAppLocation = util.format('http://%s:%d/', myUtil.localAddress(), httpPort);

var log = bunyan.createLogger({name: 'roku'});
var ssdpLog = log.child({module: 'ssdp-server'});

var ssdpServer = ssdpServerFactory.create({log: ssdpLog, location: htppAppLocation})

var app = express();

app.use(midllewares.with(function (req, res, next){
  req.log = log.child({reqId: myUtil.guid()});
  req.ssdpServer = ssdpServer;
  next();
}));

app.use(midllewares.errorHandler);

app.use ('/', routes)

var server = app.listen(httpPort, function () {
  log.info({'app': app}, "Server Listening");
});
