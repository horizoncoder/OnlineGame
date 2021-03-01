import { drop, map, clone } from "lodash";
import {
  CALC_SCORE,
  SET_BOARD_SIZE,
  SWITCH_TURN,
  PUTLINE,
  GET_LINE_COORDS,
  PUSH_COORDS,
} from "../actions";

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
const shouldSetLine = (state, x, y, p) => {
  if (p === 2 && x + 1 < state.count) return false;
  if (p === 3 && y + 1 < state.count) return false;
  return true;
};
const pushCoords = (state) => {
  let boxesCoords = [];
  const coordsV = [];
  const coordsH = [];
  for (let y = 0; y < state.count; y += 1) {
    for (let x = 0; x < state.count; x += 1) {
      boxesCoords.push(`${x}${y}`);
      for (let p = 0; p < 4; p += 1) {
        if (shouldSetLine(x, y, p)) {
          (p % 2 === 0 ? coordsV : coordsH).push(getLineCoords(x, y, p));
        }
      }
    }
  }

  let BoxsCoord = []; // сортировка координат
  BoxsCoord = map(boxesCoords, clone);
  const sortedCoordsH = [];
  for (let i = 0; i < state.count; i += 1) {
    for (
      let j = i * state.count;
      j < i * state.count + state.count * 3;
      j += 1
    ) {
      const s = j > state.count ? j - state.count : j;
      const lineP = j > state.count ? 3 : 1;
      const boxC = boxesCoords[s];
      const lineIdx = coordsH.findIndex((c) =>
        c.find((item) => item === `${boxC}${lineP}`)
      );
      sortedCoordsH.push(coordsH[lineIdx]);
    }
    boxesCoords = drop(boxesCoords, state.count * 2);
    
    return {
      BoxsCoord,
      coordsV,
      coordsH: sortedCoordsH,
    };
  }
};
const calcScore = (state) => ({
  Color: state.turn ? state.numRed : state.numBlue,
  // подсчет очков
  numRed: Object.values(state.boxColors).filter((color) => color === "red")
    .length, // считаем очки
  numBlue: Object.values(state.boxColors).filter((color) => color === "blue")
    .length,
});

const EndGame = (state) => {
  if (Object.keys(state.boxColors).length === state.count ** 2) {
    alert("Игра завершина");
    document.location.reload();
  }
};
const checkBoxes = (state) => {
  const { lineCoordinates, boxColors } = state;
  const filledBoxes = {};
  Object.keys(lineCoordinates).forEach((coord) => {
    const splitCoord = coord.split("");
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

const initialState = {
  count: 0,
  boxClass: " box1 ",
  turn: "red",
  numBlue: 0,
  numRed: 0,
  errorMessage: null,
  lineCoordinates: {},
  boxColors: {},
  BoxsCoord: {},
  coordsV: {},
  coordsH: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_SIZE:
      return { ...state, count: action.size };
    case SWITCH_TURN:
      return { ...state, turn: state.turn === "red" ? "blue" : "red" };
    case CALC_SCORE:
      return { ...state, ...calcScore(state) };
    case GET_LINE_COORDS:
      return { ...state, ...getLineCoords() };
    case PUSH_COORDS:
      return {
        ...state,
        ...pushCoords(state),
      };

    case PUTLINE: {
      const newCoords = action.coord.reduce((acc, coord) => {
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
      return {
        ...state,
        ...newLineState,
        ...newBoxState,
        ...calcScore(newBoxState),
        ...EndGame(newBoxState),
      };
    }
    default:
      return state;
  }
};
