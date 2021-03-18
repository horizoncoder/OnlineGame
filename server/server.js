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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  next();
});
const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require('./models');
const tutorials = require('./controllers/room.controller');

db.sequelize.sync();
const Role = db.role;
function initial() {
  Role.create({
    id: 1,
    name: 'user',
  });

  Role.create({
    id: 2,
    name: 'moderator',
  });

  Role.create({
    id: 3,
    name: 'admin',
  });
}
// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  initial();
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/room.routes')(app);

app.use(cors(corsOptions));
const router = require('./router');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getRoomIdInRoom,
} = require('./user');

const port = 5000;
http.listen(port, () => {});
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.get('/users', (req, res) => {
  const users = [{ id: 1, firstName: 'john', lastName: 'Doe' }];
  res.json(users);
});

io.on('connect', (socket) => {
  socket.on('join', ({ name, room, roomid }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
      roomid: 100,
    });
    console.log(user);
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room} ${user.roomid}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', {
      room: user.room,
      roomid: 100,
      users: getUsersInRoom(user.room),
    });
    console.log(user);
    callback();
  });

  socket.on(
    'sendMessage',
    (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });

      callback();
    },
  );
  socket.on(
    'users',
    (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });

      callback();
    },
  );

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    const Tutorial = db.rooms;
    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      console.log(user);
      Tutorial.update(
        { status: 'game stoped' },
        {
          where: {
            room: user.room,
          },
        }
      ).then((res) => {
        console.log(res);
      });
    }
  });

  app.use(bodyParser.json());

  app.use(cors());
  app.use(express.json());
  app.use(router);
});
