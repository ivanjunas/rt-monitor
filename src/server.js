// usage: node server [port] [tls] 
var fs      = require('fs'),
    path    = require('path'),
    http    = require('http'),
    https   = require('https'),
    mime    = require('mime'),
    deflate = require('permessage-deflate'),
    faye    = require('faye');

var SHARED_DIR = __dirname,
    PUBLIC_DIR = SHARED_DIR + '/public',

    // addapeter na faye 
    bayeux     = new faye.NodeAdapter({mount: '/bayeux', timeout: 20}),

    port       = process.argv[2] || '8000',
    secure     = process.argv[3] === 'tls',
    key        = fs.readFileSync(SHARED_DIR + '/server.key'),
    cert       = fs.readFileSync(SHARED_DIR + '/server.crt');

bayeux.addWebsocketExtension(deflate);


// normal handling of request, doesn't have anything with faye 
var handleRequest = function(request, response) {
  var path = (request.url === '/') ? '/index.html' : request.url;

  fs.readFile(PUBLIC_DIR + path, function(err, content) {
    var status = err ? 404 : 200;
    try {
      response.writeHead(status, {'Content-Type': mime.lookup(path)});
      response.end(content || 'Not found');
    } catch (e) {}
  });
};

var server = secure
           ? https.createServer({cert: cert, key: key}, handleRequest)
           : http.createServer(handleRequest);

bayeux.attach(server);
server.listen(Number(port));


// Bar data 
bayeux.getClient().subscribe('/bar-traffic', function(msg) {
  console.log('[' + msg.user + ']: ' + JSON.stringify(msg.data));
});
// Line data 
bayeux.getClient().subscribe('/line-traffic', function(msg) {
  console.log('[' + msg.user + ']: ' + JSON.stringify(msg.data));
});


// logging of subscribtions and connections

bayeux.on('subscribe', function(clientId, channel) {
  console.log('[  SUBSCRIBE] ' + clientId + ' -> ' + channel);
});

bayeux.on('unsubscribe', function(clientId, channel) {
  console.log('[UNSUBSCRIBE] ' + clientId + ' -> ' + channel);
});

bayeux.on('disconnect', function(clientId) {
  console.log('[ DISCONNECT] ' + clientId);
});

console.log('Listening on ' + port + (secure? ' (https)' : ''));