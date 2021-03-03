const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const socketService = require('./socket');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    методы: ['GET', 'POST'],
  },
});
const router = require('./router');
const { addUser, removeUser, getUser, getUserInRoom } = require('./user');

const port = 5000;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
io.on('connection', (socket) => {
  // socket.on('message', (data) => {
  //   io.emit('message', { from: data.from, message: data.message });
  // });
  /// /
  socket.on('join', ({ name, room }, cb) => {
    console.log(name, room);
    const {error, user } = addUser({ id: socket.id, name, room });
    if (error) return cb(error);
    socket.emit('message', { user: 'admin', text: `${user.name} Welcome to the room:${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin' , text: `${user.name} ,has joined` });

    socket.join(user.room);
    cb();
  });
  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
    cb();
  });
  /// /
});

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(router);

app.use('/dashboard', require('./routes/dashboard'));

app.use('/auth', require('./routes/jwtAuth'));
