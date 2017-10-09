const http = require('http');
const route = require('routes');

const hostname = '127.0.0.1';
const port = 3000;

route.add('/user/', );

const server = http.createServer((req, res) => {

  req.on('error', (err) => {
    console.error(err);
  });

  res.on('error', (err) => {
    console.error(err);
  });

  switch (req.method) {
    case 'GET':
      if (req.url.match(/\/user\/\d+/g)) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        var jsonData = {
          id: '1',
          user: 'hvo21',
          pwd: 'Test123',
          displayName: 'Hao Van Vo'
        };
        res.end(JSON.stringify(jsonData));
        console.log(JSON.stringify(jsonData));
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/xml');
        res.end('API is not found!');
      }
      break;

    case 'POST':
      break;

    case 'PUT':
      break;

    case 'DELETE':
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});