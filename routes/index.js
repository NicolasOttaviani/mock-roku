var routes = require('express').Router();

routes.use ('/api',
  require('./ping.js'),
  require('./ssdp.js')
);

module.exports = routes;
