const {
  getUser,
} = require('./user');
const test = () => {
  let socketInstance;
  const users = [{ id: 33, firstName: 'john', lastName: 'Doe' }];
  if (socketInstance) {
    socketInstance = socket;
    const user = getUser(socket.id);
    io.emit('action', { type: 'users8', users });
  }
  res.json(users);
};

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
const log = () =>{
  console.log('Log');
}
const pushCoords = (count) => {
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
      const lineIdx = coordsH.findIndex((c) =>
        c.find((item) => item === `${boxC}${lineP}`)
      );
      sortedCoordsH.push(coordsH[lineIdx]);
    }
    return {
      BoxsCoord,
      coordsV,
      coordsH: sortedCoordsH,
    };
  }
};
const initialState = {
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

module.exports = {
  test, pushCoords,log
};
