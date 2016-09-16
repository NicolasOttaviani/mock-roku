var routes = require('express').Router();

routes.use ('/api',
  require('./ping.js')
);

module.exports = routes;
