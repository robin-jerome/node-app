var http = require('http');

http.createServer(function (req, res) {
  res.write('Campaign version of Application Running!');
  res.end();
}).listen(8080);