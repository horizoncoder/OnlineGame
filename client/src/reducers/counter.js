import { INCREMENT, DECREMENT, TINT, UNTINT } from "../actions";

const initialState = {
  count: 0,
  name: "",
  turn: "red",
  errorMessage: null,
  lineCoordinates: {},
  boxColors: {},
};
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
      boxColors[`${i},${j}`] = "white";
    }
  }
  return { lineCoordinates, boxColors };
};
const tint = (event) => {
  const currentCoord = event.target.dataset.coord;
  if (this.lineCoordinates[currentCoord] === 0) {
    if (this.turn === "red") {
      console.log("rgba(255,0,0,0.5)");
    } else {
      event.target.style.backgroundColor = "rgba(0,0,255,0.5)";
    }
  }
};

const untint = (event) => {
  const currentCoord = event.target.dataset.coord;
  if (this.lineCoordinates[currentCoord] === 0) {
    event.target.style.backgroundColor = "rgb(255,255,255)";
  }
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
    case TINT:
      if (state.turn === "red") {
        return {
          ...state,
          ...tint(state),
        };
      }
      return state;

    default:
      return state;
  }
};
