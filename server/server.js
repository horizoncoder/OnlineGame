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

app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require('./models');

db.sequelize.sync();
// const Role = db.role;
// function initial() {
//   Role.create({
//     id: 1,
//     name: 'user',
//   });
// }
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: false }).then(() => {
//   initial();
// });

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/room.routes')(app);

app.use(cors(corsOptions));
const router = require('./router');

const port = 5000;
http.listen(port, () => {});

io.on('connect', (socket) => {
  const state = {
    count: 0,
    boxClass: ' box1 ',
    turn: 'red',
    numBlue: 0,
    numRed: 0,
    lineCoordinates: {},
    boxColors: {},
    BoxsCoord: {},
    coordsV: {},
    coordsH: {},
  };
  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User Joined Room: ${data} ||   ${socket.id}`);
  });
  socket.on('unjoin_room', (data) => {
    const Tutorial = db.rooms;
    socket.join(data);
    console.log(`User Left Room: ${data} ||   ${socket.id}`);
    Tutorial.update(
      { status: 'stoped' },
      {
        where: {
          room: data,
        },
      },
    ).then((res) => {
      console.log(res);
    });
  });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data.content);
  });

  socket.on('switch', (data) => {
    io.in(data.room).emit(
      'action',
      {
        type: 'switchturn',
      },
      data,
    );
    console.log(data);
  });
  const calcScore = () => ({
    Color: state.turn ? state.numRed : state.numBlue,
    // подсчет очков
    numRed: Object.values(state.boxColors).filter((color) => color === 'red')
      .length, // считаем очки
    numBlue: Object.values(state.boxColors).filter((color) => color === 'blue')
      .length,
  });
  const EndGame = () => {
    if (Object.keys(state.boxColors).length === state.count ** 2) {
      console.log('Buhfds');
    }
  };
  const checkBoxes = () => {
    const { lineCoordinates, boxColors } = state;
    const filledBoxes = {};
    Object.keys(lineCoordinates).forEach((coord) => {
      const splitCoord = coord.split('');
      const x = splitCoord[0]; // x кордината
      const y = splitCoord[1]; // y кордината
      const boxCount = filledBoxes[`${x}${y}`];
      if (!boxColors[`${x}${y}`]) {
        filledBoxes[`${x}${y}`] = boxCount ? boxCount + 1 : 1;
      }
    });
    return Object.keys(filledBoxes).reduce((acc, key) => {
      if (filledBoxes[key] === 4) {
        acc[key] = state.turn;
      }
      return acc;
    }, {});
  };
  socket.on('put', (coord, data) => {
    const newCoords = coord.reduce((acc, coord) => {
      if (!state.lineCoordinates[coord]) {
        acc[coord] = state.turn;
      }
      return acc;
    }, {});
    const newLineState = {
      ...state,
      lineCoordinates: { ...state.lineCoordinates, ...newCoords },
    };
    const newBoxState = {
      ...newLineState,
      boxColors: {
        ...newLineState.boxColors,
        ...checkBoxes(newLineState),
      },
    };
    const score = {
      Color: state.turn ? state.numRed : state.numBlue,
      // подсчет очков
      numRed: Object.values(state.boxColors).filter((color) => color === 'red')
        .length, // считаем очки
      numBlue: Object.values(state.boxColors).filter((color) => color === 'blue')
        .length,
    };

    io.in(data.room).emit(
      'action',
      {
        type: 'putline',
        coord,
        newLineState,
        ...state,
        score,
        ...newLineState,
        ...newBoxState,
        ...calcScore(newBoxState),
        ...EndGame(newBoxState),
      },
      data,
    );
  });
  socket.on('users', (count, data) => {
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
      io.in(data.room).emit(
        'action',
        {
          type: 'users8',
          BoxsCoord,
          sortedCoordsH,
          coordsV,
          count,
        },
        data,
      );
    }
  });

  app.use(bodyParser.json());

  app.use(cors());
  app.use(express.json());
  app.use(router);
});
