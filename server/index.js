const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
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
  socket.on('join', ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return cb(error);
    socket.emit('message', {
      user: 'admin',
      text: `${user.name} Welcome to the room:${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} ,has joined` });

    socket.join(user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
    cb();
  });
  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUserInRoom(user.room),
    });
    cb();
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left the room` });
    }
  });
});

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(router);

app.use('/dashboard', require('./routes/dashboard'));

app.use('/auth', require('./routes/jwtAuth'));
