const http = require('http');


let server = http.createServer((req, res) => {

  res.writeHead(200);

  res.end('Serveur principal !');

});

server.listen(8080);
