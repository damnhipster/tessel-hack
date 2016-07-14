// Import the interface to Tessel hardware
var tessel = require('tessel');

var url = require('url')
  , WebSocketServer = require('ws').Server
  , express = require('express')
  , http = require('http')
  , fs = require('fs')
  , port = 4080
  , wss = new WebSocketServer({ port: port + 1 });

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);

  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  // ws.on('message', function incoming(message) {
  //   console.log('received: %s', message);
  // });
  //
  // ws.send('something');
  // Turn one of the LEDs on to start.
  tessel.led[2].on();

  // Blink!
  setInterval(function () {
    tessel.led[2].toggle();
    tessel.led[3].toggle();
  }, 100);

  console.log("I'm blinking! (Press CTRL + C to stop)");
});

var server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(404);
    res.end('No favicon');
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  var fileStream = fs.createReadStream(__dirname + '/index.html');
  fileStream.pipe(res);
});

server.listen(port, function() {
  console.log('Listening on ' + port)
  console.log('WebSocket Server on ', port + 1)
});

// // Turn one of the LEDs on to start.
// tessel.led[2].on();
//
// // Blink!
// setInterval(function () {
//   tessel.led[2].toggle();
//   tessel.led[3].toggle();
// }, 100);
//
// console.log("I'm blinking! (Press CTRL + C to stop)");
