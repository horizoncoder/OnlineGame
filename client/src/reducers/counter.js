import { CALC_SCORE, SET_BOARD_SIZE, SWITCH_TURN } from "../actions";

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

const initialState = {
  count: 2,
  name: "",
  turn: "red",
  numBlue: 0,
  numRed: 0,
  errorMessage: null,
  lineCoordinates: {},
  boxColors: {},
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
    default:
      return state;
  }
};
