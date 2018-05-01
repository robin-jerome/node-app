const http = require('http');
const ip = require("ip");

http.createServer(function (req, res) {
  res.write(`********** Campaign version of Application Running - Hosted by ${ip.address()} **********\n`);
  res.end();
}).listen(8080);