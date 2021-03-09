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

const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require('./models');
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

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
app.use(cors(corsOptions));
const router = require('./router');
const { addUser, removeUser, getUser, getUserInRoom } = require('./user');
app.get('/api/customers', (req, res) => {
  const customers = [{ id: 1, firstName: 'john', lastName: 'Doe' }];
  res.json(customers);
});
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
      .emit('message', { user: 'admin', text: `${user} ,has joined` });

    socket.join(user.room);
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUserInRoom(user.room),
    });
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
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left the room`,
      });
    }
  });
});

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(router);

app.use('/dashboard', require('./routes/dashboard'));

app.use('/auth', require('./routes/jwtAuth'));
