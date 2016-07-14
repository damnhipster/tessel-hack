// Import the interface to Tessel hardware
var tessel = require('tessel')
  , ambientlib = require('ambient-attx4')
  , ambient = ambientlib.use(tessel.port['A']);

var url = require('url')
  , WebSocketServer = require('ws').Server
  , express = require('express')
  , http = require('http')
  , fs = require('fs')
  , port = 4080
  , wss = new WebSocketServer({ port: port + 1 });

wss.on('connection', function connection(ws) {

  setInterval(function() {

    ambient.getSoundLevel(function(err, soundData) {
      if(err) throw err;
      ws.send(soundData.toString());
    })
  }, 100);

});

var server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(404);
    res.end('No favicon');
    return;
  }

  if(req.url === "/donald.jpg") {
    res.writeHead(200, {
      'Content-Type': 'image/jpeg'
    });
    var fileStream = fs.createReadStream(__dirname + '/public/donald.jpg');
    fileStream.pipe(res);
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  var fileStream = fs.createReadStream(__dirname + '/public/index.html');
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
