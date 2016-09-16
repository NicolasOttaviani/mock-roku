var routes = require('express').Router();

routes.get('/ping', ping);

function ping (req, res){
  console.log(',')
  res.status(200).send('pong');
}

module.exports = routes;
