var express = require('express'),
    bunyan = require ('bunyan'),

    midllewares = require('../../lib/middlewares')

module.exports = {
  create: function (midlleware){
    var app = express();
    var log = bunyan.createLogger({name: 'roku-test'});
    app.use (function (req, res, next){
      req.log = log;
      next();
    });
    app.use(midllewares.with(midlleware));
    app.use(midllewares.errorHandler);

    return app;
  }
}
