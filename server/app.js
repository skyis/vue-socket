
import SocketIO from 'socket.io';
import fs from 'fs';
import http from 'http';
// import https from 'https';

// const options = {
//   key: fs.readFileSync().toString(),
//   cert: fs.readFileSync().toString(),
//   ca: fs.readFileSync().toString(),
// }
function handler(req, res) {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading html');
    }
    res.writeHead(200);
    return res.end(data);
  });
}

const app = http.createServer(handler);
const io = new SocketIO(app);
app.listen(8080);

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});
