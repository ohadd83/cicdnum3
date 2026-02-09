const http = require('http');

http.createServer((req, res) => {
  res.end("Hello Jenkins CI/CD 🚀");
}).listen(3000);

