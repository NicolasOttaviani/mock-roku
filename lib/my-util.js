var os = require('os');
var util = require('util');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function localAddress (){
  // TODO use env variable and filter IPv6 better
  return os.networkInterfaces()['eth0'][0].address;
}

function reformat (){
  var args = Array.prototype.slice.call(arguments);
  var text = args.shift();

  return util.format (text, args);
}

module.exports = {
  guid: guid,
  localAddress: localAddress,
  reformat: reformat
};
