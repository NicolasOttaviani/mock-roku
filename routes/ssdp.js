var routes = require('express').Router();

routes.get('/ssdp', getStatus);
routes.put('/ssdp', switchServer);

function getStatus (req, res){
  res.status (200)
     .json({
       started: req.ssdpServer.isStarted()
    });
}

function switchServer (req, res){
  req.checkBody('switch', 'Bad parameter. Possibility "on" or "off".').isIn(['on', 'off']);
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return;
  }
  var action = req.body.switch;

  if ((action === "on" && req.ssdpServer.isStarted()) ||
      (action === "off" && !req.ssdpServer.isStarted())){
    res.status(202).end();
    return;
  }

  switch (action) {
    case "on":
      req.ssdpServer.start();
      res.status(201).end();
      break;
    case "off":
      req.ssdpServer.stop();
      res.status(200).end();
      break;
    default:
      res.status(400).end();
  }
}

module.exports = routes;
