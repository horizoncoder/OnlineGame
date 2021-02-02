const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 5000;

app.use(cors());
app.use(express.json());

http.listen(port, () => {
  console.log(`listening on port ${port} `);
});

app.use('/dashboard', require('./routes/dashboard'));

app.use('/auth', require('./routes/jwtAuth'));
