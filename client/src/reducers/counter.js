import {
  CALC_SCORE,
  SET_BOARD_SIZE,
  SWITCH_TURN,
  CHECKSQUARE,
  SPLITCOORD,
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
// const EndGame = (state) => {
//   if (
//     this.state.numRed + this.state.numBlue + 1 ===
//     this.state.count * this.state.count
//   ) {
//     console.log(state.numRed + state.numBlue);
//     alert("Ehf")
//   }
// };

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
  const filled = checker1 + checker2 + checker3 + checker4 === 4;

  if (filled) {
    return {
      ...state,
      ...(state.turn === "blue"
        ? { numBlue: state.numBlue + 1 }
        : { numRed: state.numRed + 1 }),
      boxColors: {
        ...state.boxColors,
        [`${y},${z}`]: state.turn,
      },
    };
  }

  if (state.numRed + state.numBlue === state.count ** 2) {
    console.log("Игра завершена");
    // document.location.reload();
  }

  return state;
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
    case CHECKSQUARE:{
      // if (checkSquare(state.y, state.z, state) === 4 && state.turn === "blue") {
      //   return { ...state, numBlue: state.numBlue + 1 };
      // }
      const lCoord = state.lineCoordinates;
      if (lCoord[action.coord] === 0)
        lCoord[action.coord] = state.turn === "red" ? 1 : -1;

      const updatedState = {
        ...state,
        lineCoordinates: {
          ...state.lineCoordinates,
          ...lCoord,
        },
      };
      console.log('COLORS', checkSquare(action.y, action.z, updatedState));
      console.log('COORD', action.coord, '---y:', action.y, '---z:', action.z);
      return {
        ...state,
        ...updatedState,
        ...checkSquare(action.y, action.z, updatedState),
      };
      // case 'SPLITCOORD"': {
      //   // action.y;
      //   // action.x;
      //   if (checkSquare(action.y, action.z, state) === 4) {
      //     const updateLineCoords = state.lineCoordinates;
      //     updateLineCoords[`${i},${j},${k}`] = state.turn === "red" ? 1 : -1;
      //     const updatedState = { ...state, lineCoordinates: updateLineCoords };
      //     return {
      //       ...state,
      //       ...updatedState,
      //       ...checkSquare(x, y, updatedState),
      //     };
      //     }
      //   }
    }
    default:
      return state;
  }
};
