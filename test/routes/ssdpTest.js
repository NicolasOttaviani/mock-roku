var request = require('supertest')
  , should = require('should')
  , appHelper = require('../helper/app.js')
  , ssdp = require('../../routes/ssdp');

var app = appHelper.create(init);
var ssdpServer = new MockServer();

app.use('/api', ssdp);

function init(req, res, next){
  req.ssdpServer = ssdpServer;
  next();
}

function MockServer (){
  this.started = false;
}
MockServer.prototype.start = function (){
  this.started = true;
}
MockServer.prototype.stop = function (){
  this.started = false;
}
MockServer.prototype.isStarted = function (){
  return this.started;
}

describe('routes ::: ssdp', function (){
  describe('GET /api/ssdp', function (){
    it('should returns {started: true} when ssdp is started', function (done){
      ssdpServer.start();
      request(app)
        .get('/api/ssdp')
        .expect(200)
        .end(function(err,res) {
    			if (err) {
    				throw err;
    			}
          res.body.should.have.property('started');
          res.body.started.should.equal(true);

    			done();
    		});
    });

    it('should returns {started: false} when ssdp is stopped', function (done){
      ssdpServer.stop();
      request(app)
        .get('/api/ssdp')
        .expect(200)
        .end(function(err,res) {
    			if (err) {
    				throw err;
    			}
          res.body.should.have.property('started');
          res.body.started.should.equal(false);

    			done();
    		});
    });
  });

  describe('PUT /api/ssdp', function (){
    it('should return error when not put switch property', function (done){
      ssdpServer.start()
      request(app)
        .put('/api/ssdp')
        .send ( {bad: true} )
        .expect(400)
        .end(function(err,res) {
    			if (err) {
    				throw err;
    			}
          res.body.should.be.an.Array;
          res.body[0].should.have.property('param');
          res.body[0].param.should.equal('switch');
    			done();
    		});
    });

    it('should return 202 when put {switch: "on"} and server already started', function (done){
      ssdpServer.start()
      request(app)
        .put('/api/ssdp')
        .send ( {switch: "on"} )
        .expect(202, done)
    });

    it('should return 202 when put {switch: "off"} and server already stopped', function (done){
      ssdpServer.stop()
      request(app)
        .put('/api/ssdp')
        .send ( {switch: "off"} )
        .expect(202, done)
    });

    it('should return 201 and start server when put {switch: "on"} and server stopped', function (done){
      ssdpServer.stop()
      request(app)
        .put('/api/ssdp')
        .send ( {switch: "on"} )
        .expect(201)
        .end(function(err,res) {
    			if (err) {
    				throw err;
    			}
          ssdpServer.started.should.be.equal(true);
    			done();
    		});
    });

    it('should return 200 and stop server when put {switch: "off"} and server started', function (done){
      ssdpServer.start()
      request(app)
        .put('/api/ssdp')
        .send ( {switch: "off"} )
        .expect(200)
        .end(function(err,res) {
    			if (err) {
    				throw err;
    			}
          ssdpServer.started.should.be.equal(false);
    			done();
    		});
    });

  });
});
