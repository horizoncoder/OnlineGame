import { INCREMENT, DECREMENT, BOARDS } from "../actions";

const initialState = {
  count: 0,
  // boardSize: 4,
  name: "",
  sizes: 0,
  errorMessage: null,
  lineCoordinates: {},
  boxColors: {},
};

const initCoords = (boardSize) => {
  const lineCoordinates = {};
  const boxColors = {};
  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < boardSize + 1; j += 1) {
      for (let k = 0; k < boardSize; k += 1) {
        lineCoordinates[`${i},${j},${k}`] = 0;
      }
    }
  }
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      boxColors[`${i},${j}`] = "white";
    }
  }
  return { lineCoordinates, boxColors };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      if (state.count <= 14) {
        return {
          ...state,
          count: state.count + 2,
          ...initCoords(state.count),
        };
      }
      return state;

    case DECREMENT:
      if (state.count >= 4) {
        return {
          ...state,
          count: state.count - 2,
          ...initCoords(state.count),
        };
      }
      return state;

    default:
      return state;
  }
};
