import {
  CALC_SCORE,
  SET_BOARD_SIZE,
  SWITCH_TURN,
  CHECKSQUARE,
} from "../actions";

// создать координаты
const initCoords = (count) => {
  const lineCoordinates = {};
  const boxColors = {};
  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < count + 1; j += 1) {
      for (let k = 0; k < count; k += 1) {
        lineCoordinates[`${i},${j},${k}`] = 0;
      }
    }
  }
  for (let i = 0; i < count; i += 1) {
    for (let j = 0; j < count; j += 1) {
      boxColors[`${i},${j}`] = "black";
    }
  }
  return { lineCoordinates, boxColors };
};

const calcScore = (state) => ({
  numRed: state.turn === "red" ? state.numRed + 1 : state.numRed, // считаем очки
  numBlue: state.turn === "blue" ? state.numBlue + 1 : state.numBlue,
});

const checkSquare = (y, z, state) => {
  const { lineCoordinates, count } = state;
  const checker1 = Math.abs(lineCoordinates[`0,${y},${z}`]);
  const checker2 = Math.abs(
    parseFloat(y) + 1 > count
      ? 0
      : lineCoordinates[`0,${parseFloat(y) + 1},${z}`]
  );
  const checker3 = Math.abs(lineCoordinates[`1,${z},${y}`]);
  const checker4 = Math.abs(
    parseFloat(z) + 1 > count
      ? 0
      : lineCoordinates[`1,${parseFloat(z) + 1},${y}`]
  );
  return checker1 + checker2 + checker3 + checker4;
};

const initialState = {
  count: 2,
  name: "",
  turn: "red",
  numBlue: 0,
  numRed: 0,
  errorMessage: null,
  lineCoordinates: {},
  boxColors: {},
  box: 0,
  box2: 0,
  box3: 0,
  box4: 0,
  ...initCoords(2),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_SIZE:
      return { ...state, count: action.size, ...initCoords(action.size) };
    case SWITCH_TURN:
      return { ...state, turn: state.turn === "red" ? "blue" : "red" };
    case CALC_SCORE:
      return { ...state, ...calcScore(state) };
    case CHECKSQUARE:
      alert(checkSquare(action.y, action.z, state));
      if (checkSquare(action.y, action.z, state) === 4) {
        return { ...state, box: state.box + 4 };
      }
      if (checkSquare(parseFloat(action.y) - 1, action.z, state) === 4) {
        return { ...state, box2: state.box2 + 4 };
      }
      if (checkSquare(action.z, action.y, state) === 4) {
        return { ...state, box3: state.box3 + 4 };
      }
      if (checkSquare(action.z, parseFloat(action.y) - 1, state) === 4) {
        return { ...state, box4: state.box4 + 4 };
      }
      return {
        ...state,
        ...checkSquare(action.y, action.z, state, state.box + 1),
      };
    default:
      return state;
  }
};
