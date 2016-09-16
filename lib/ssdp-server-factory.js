
var util = require('util')
  , myUtil = require ('./my-util.js')
  , SsdpServer = require('./ssdp-server.js');


function createServer (options){
  var ssdpServer = new SsdpServer({
    udn: 'uuid:roku:ecp:P0A070000009',
    ttl: '2',
    description: '',
    location: options.location,
    ssdpSig: ' ',
    st: 'roku:ecp'
  });
  ssdpServer._logger = function (){
    options.log.info (myUtil.reformat(arguments));
  }
  return ssdpServer;
}

function SsdpServerAdaptor (options){
  this.log = options.log;
  this.location = options.location;

  this.internalServer = false;
}

//SsdpServerAdaptor.prototype._createServer
function _createServer(){
  var me = this;
  var ssdpServer = new SsdpServer({
    udn: 'uuid:roku:ecp:P0A070000009',
    ttl: '2',
    description: '',
    location: me.location,
    ssdpSig: ' ',
    st: 'roku:ecp'
  });
  ssdpServer._logger = function (){
    me.log.info (myUtil.reformat(arguments));
  }
  return ssdpServer;
}

//SsdpServerAdaptor.prototype.start
function start (){
  if (!this.internalServer){
    this.internalServer = this._createServer();
    this.internalServer.start();
  }
}

//SsdpServerAdaptor.prototype.stop
function stop (){
  if (this.internalServer){
    this.internalServer.stop();
    this.internalServer = false;
  }
}

//SsdpServerAdaptor.prototype.isStarted
function isStarted (){
  return this.internalServer && this.internalServer._started;
}

SsdpServerAdaptor.prototype._createServer = _createServer;
SsdpServerAdaptor.prototype.start = start;
SsdpServerAdaptor.prototype.stop = stop;
SsdpServerAdaptor.prototype.isStarted = isStarted;

function create (options){
  return new SsdpServerAdaptor(options);
}

module.exports = {
  create: create,
  SsdpServer: SsdpServerAdaptor
}
