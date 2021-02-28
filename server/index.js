const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Socket } = require('dgram');
const http = require('http').createServer(app);
const socketService = require('./socket');
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

io.on('connection',socket => {
  console.log(`user connected with socket id ${socket.id}`);
  socket.on('join-room', data =>{
    socket.join(data.roomId);
    const room = socketService().addUserToRoom(data.username,data.roomId);
    io.to(data.roomId).emit('roomData',room);
  })

socket.on('leave-room',data =>{
 const room = socketService().removeUserFromRoom(data.username, data.roomId);
 io.to(data.roomId).emit('roomData', room);
 
  socket.leave(data.roomId);
})

  socket.on('message', data=>{
    io.to(data.roomId).emit('message',data);
  })
})

app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

app.use('/dashboard', require('./routes/dashboard'));

app.use('/auth', require('./routes/jwtAuth'));
