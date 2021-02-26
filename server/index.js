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
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  console.log('new client connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(cors());
app.use(express.json());

app.use('/dashboard', require('./routes/dashboard'));

app.use('/auth', require('./routes/jwtAuth'));
