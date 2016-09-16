
var bodyParser = require ('body-parser'),
    expressValidator = require ('express-validator');

function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

function errorHandler (err, req, res, next){
  req.log.error(err);
  res.status(500);
  res.send(err.message);
}


module.exports = {
  allowCrossDomain: allowCrossDomain,
  errorHandler: errorHandler,
  with: function (middleware){
    return [
      middleware,
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      allowCrossDomain,
      expressValidator()
    ];
  }
};
