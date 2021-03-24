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
const { test, shouldSetLine, getLineCoords } = require('./game');
const { basename } = require('path');
const port = 5000;
http.listen(port, () => {});
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

let socketInstance;

io.on('connect', (socket) => {
  app.get('/items', (req, res) => {
    const items = { id: 1, firstName: 'john', lastName: 'Doe' };
    if (socketInstance) {
      socketInstance = socket;
    }
    res.json(items);
  });

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
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });
    io.to(user.room).emit('roomData', {
      room: user.room,
      roomid: 100,
      users: getUsersInRoom(user.room),
    });
    // socket.roomdata(socketInstance);
    //
    console.log(user);
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    socketInstance = socket;
    const user = getUser(socket.id);
    socketInstance = socket;
    // console.log(user.room);
    io.in(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('users', (callback) => {
    const user = getUser(socket.id);
    const getLineCoords = (x, y, p) => {
      // получаем координаты линии
      if (p === 0 && x > 0) {
        return [`${x - 1}${y}${2}`, `${x}${y}${p}`];
      }
      if (p === 1 && y > 0) {
        return [`${x}${y - 1}${3}`, `${x}${y}${p}`];
      }
      return [`${x}${y}${p}`];
    };

    const shouldSetLine = (count, x, y, p) => {
      if (p === 2 && x + 1 < count) return false;
      if (p === 3 && y + 1 < count) return false;
      return true;
    };
    socketInstance = socket;
    const count = 2;
    const boxesCoords = [];
    const coordsV = [];
    const coordsH = [];
    for (let y = 0; y < count; y += 1) {
      for (let x = 0; x < count; x += 1) {
        boxesCoords.push(`${x}${y}`);
        for (let p = 0; p < 4; p += 1) {
          if (shouldSetLine(count, x, y, p)) {
            (p % 2 === 0 ? coordsV : coordsH).push(getLineCoords(x, y, p));
          }
        }
      }
    }
    let BoxsCoord = []; // сортировка координат
    BoxsCoord = [...boxesCoords];
    const sortedCoordsH = [];
    for (let i = 0; i < count; i += 1) {
      for (let j = i * count; j < i * count + count * 20; j += 1) {
        const s = j > count ? j - count : j;
        const lineP = j > count ? 3 : 1;
        const boxC = boxesCoords[s];
        const lineIdx = coordsH.findIndex((c) => c.find((item) => item === `${boxC}${lineP}`));
        sortedCoordsH.push(coordsH[lineIdx]);
      }
      io.emit('action', {
        type: 'users8', BoxsCoord, sortedCoordsH, coordsV, count,
      });
    }

    // callback();
  });
  socket.on('board', (size) => {
    io.emit('action', {
      type: 'setboard',
      size,
    });
  });

  socket.on('switch', () => {
    io.emit('action', {
      type: 'switchturn',
    });
  });

  socket.on('put', (coord) => {
    io.emit('action', {
      type: 'putline',
      coord,
    });
  });

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
        },
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
