
// usage: node publish [address] [port] 

var faye = require('faye'),
    address = process.argv[2] || '127.0.0.1',
    port = process.argv[3] || '8000';

function getTimeValue() {
  var dateBuffer = new Date();
  var Time = dateBuffer.getTime();
  return Time;
}

function getRandomValue() {
  var randomValue = Math.random() * 100;
  return randomValue;
}

var endpoint = 'http://' + address + ':' + port + '/bayeux',
    client   = new faye.Client(endpoint),
    n        = 0;

// send out traffic second
setInterval(function() {

  // load data from the perl script 

  client.publish('/bar-traffic', {
    user: 'ivan', 
    data: [{time: getTimeValue(), y:getRandomValue()}]
  });

  // client.publish('/line-traffic', {
  //   user: 'ivan', 
  //   data: [{time: getTimeValue(), y:getRandomValue()}]
  // });

}, 1000);