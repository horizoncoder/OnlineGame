const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 5000;

app.use(cors());
app.use(express.json());
io.on('connection', (socket) => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port} `);
});

//  routes
app.use('/dashboard', require('./routes/dashboard'));
//  register and Login
app.use('/auth', require('./routes/jwtAuth'));
//  app.listen(5000, () => {
// console.log(`Server is started on port 5000`);
//  });
