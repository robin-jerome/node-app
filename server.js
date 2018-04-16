var http = require('http');

http.createServer(function (req, res) {
  res.write('Version 1.0 of Application Running!');
  res.end();
}).listen(8080);