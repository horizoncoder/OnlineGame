const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    методы: ['GET', 'POST'],
  },
});

const port = 5000;
//io.set('origins', '127.0.0.1:5000');
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

io.on('connection', (socket) => {
  /* socket object may be used to send specific messages to the new connected client */
  console.log('new client connected');
  socket.emit('connection', null);
});
app.use(cors());
app.use(express.json());

app.use('/dashboard', require('./routes/dashboard'));

app.use('/auth', require('./routes/jwtAuth'));
