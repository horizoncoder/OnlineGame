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
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/room.routes')(app);

app.use(cors(corsOptions));
const router = require('./router');

const port = 5000;
http.listen(port, () => {});

io.on('connect', (socket) => {
  socket.on('join_room', (data,userName) => {
    let arr=["kdsksdk","weuu"]
    const Tutorial = db.rooms;
    socket.join(data);
    console.log(`User Joined Room: ${data} ||   ${socket.id}`);
    Tutorial.create(
      { status: 'wait',
        // test: arr,
        room: data,
        userid1:userName

     },
      {
        where: {
          room: data,
        },
      },
    ).then((res) => {
      console.log(res);
    });
  });
  socket.on('join_room2', (data,userName) => {
    const Tutorial = db.rooms;
    socket.join(data);
    console.log(`User Joined Room: ${data} ||   ${socket.id}`);
    Tutorial.update(
      { status: 'wait',
      room: data,
        userid2:userName

     },
      {
        where: {
          room: data,
        },
      },
    ).then((res) => {
      console.log(res);
    });
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

  socket.on('put', (coord, data,user,boxColors) => {
    const Tutorial = db.rooms;

  
    
     
    let lineCoordinates=[]
    let numRed=0
    let numBlue=0
    // подсчет очков
    numRed = Object.values(boxColors).filter((color) => color === `red${user}`)
      .length, // считаем очки
    numBlue=Object.values(boxColors).filter((color) => color === `blue${user}`)
      .length
      console.log(numRed)
      console.log(numBlue)
      const newCoords = coord.reduce((acc, coord) => {
        if (!lineCoordinates[coord]) {
          acc[coord] = ["red", user];
        }
        return acc;
      }, {});
      const newLineState = {
        lineCoordinates: { ...lineCoordinates, ...newCoords },
      };
     let boxColor=[]
     let arr= Object.values(boxColors)
     console.log(arr)
     console.log(typeof(arr))

    var resultReduce = arr.reduce(function(acc, cur) {
     if (!acc.hash[cur]) {
       acc.hash[cur] = { [cur]: 1 };
       acc.map.set(acc.hash[cur], 1);
       acc.result.push(acc.hash[cur]);
     } else {
       acc.hash[cur][cur] += 1;
       acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
     }
     return acc;
   }, {
     hash: {},
     map: new Map(),
     result: []
   });
   
   var result = resultReduce.result.sort(function(a, b) {
     return resultReduce.map.get(b) - resultReduce.map.get(a);
   });
             console.log(result);

      const newBoxState = {
        
        ...newLineState,
       
        boxColors: {
          ...newLineState.boxColor,
        },

      };
      Tutorial.update(
        { status: 'wait',
        turn:"red",
        boxfield:result
       },
        {
          where: {
            room: data.room,
          },
        },
      ).then((res) => {
        console.log(res.room)
        console.log(data)
        console.log(res);
      });
      Tutorial.findOne({
        where: {room: data.room},
      }).then(project => {
          let bx=project.boxfield
          console.log(bx)
          
            if(bx.length===3){
              Tutorial.update(
                { status: 'ending',
                userid2:"Dima",
                rednum: numRed,
                bluenum: numBlue,
               win: "winner",

               },
                {
                  where: {
                    room: data.room,
                  },
                },
              ).then((res) => {
                console.log(res.room)
                console.log(data)
                console.log(res);
              });
              console.log("game end")
            }
      })
    io.in(data.room).emit(
      'action',
      {
        type: 'putline',
        coord,
        newLineState,
        newBoxState,
        numBlue,
        numRed
      },
      data,
    );
  });
  socket.on('users', (count, data) => {
    const Tutorial = db.rooms;
    console.log(`c;ksd ${db}`)
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
      Tutorial.update(
        { status: 'wait',
        test: BoxsCoord,
        turn:"red"
       },
        {
          where: {
            room: data.room,
          },
        },
      ).then((res) => {
        console.log(res.room)
        console.log(data)
        console.log(res);
      });
      Tutorial.findOne({
        where: {room: data.room},
      }).then(project => {
     let arr=[]
     let turna=project.turn
     arr.push(project.test)
     console.log("ksdks"+ arr)
     io.in(data.room).emit(
      'action',
      {
        type: 'users8',
        arr,
        turna,
        sortedCoordsH,
        coordsV,
        count,
      },
      data,
    );
      })
      
    }
  });


  app.use(bodyParser.json());

  app.use(cors());
  app.use(express.json());
  app.use(router);
});
