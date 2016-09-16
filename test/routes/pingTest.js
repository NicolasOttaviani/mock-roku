var request = require('supertest');
var appHelper = require('../helper/app.js');
var ping = require('../../routes/ping')

var app = appHelper.create(init);
app.use('/api', ping);

function init(req, res, next){
  next();
}

describe('routes ::: ping', function (){
  describe('GET /api/ping', function (){
    it('should returns pong', function (done){
      request(app)
        .get('/api/ping')
        .expect(200, 'pong', done);
    });
  });
});
