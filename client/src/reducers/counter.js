import {
  CALC_SCORE,
  SET_BOARD_SIZE,
  SWITCH_TURN,
  CHECKSQUARE,
  SPLITCOORD,
  PUTLINE,
} from "../actions";

const calcScore = (state) => ({
  numRed: Object.values(state.boxColors).filter((color) => color === "blue")
    .length, // считаем очки
  numBlue: Object.values(state.boxColors).filter((color) => color === "red")
    .length,
});

const EndGame = (state) => {
  if (state.numBlue + state.numRed === state.count ** 2) {
    alert("Игра завершина");
}
}

const checkBoxes = (state) => {
  const { lineCoordinates, boxColors } = state;
  const filledBoxes = {};
  Object.keys(lineCoordinates).forEach((coord) => {
    const splitCoord = coord.split("");
    //console.log({ splitCoord });
    const x = splitCoord[0]; // x кордината
    const y = splitCoord[1]; // y кордината
    const boxCount = filledBoxes[`${x}${y}`];
    if (!boxColors[`${x}${y}`]) {
      filledBoxes[`${x}${y}`] = boxCount ? boxCount + 1 : 1;
    }
  });
  console.log({ filledBoxes });
  return Object.keys(filledBoxes).reduce((acc, key) => {
    if (filledBoxes[key] === 1) {
      acc[key] = state.turn;
    }
    return acc;
  }, {});
};

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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_SIZE:
      return { ...state, count: action.size };
    case SWITCH_TURN:
      return { ...state, turn: state.turn === "red" ? "blue" : "red" };
    case CALC_SCORE:
      return { ...state, ...calcScore(state) };

    case PUTLINE: {
      const newCoords = action.coord.reduce((acc, coord) => {
        acc[coord] = state.turn;
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
          ...EndGame(state),
        },
      };
      return {
        ...state,
        ...newLineState,
        ...newBoxState,
        ...calcScore(newBoxState),
      };
    }
    case CHECKSQUARE: {
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
      console.log("COLORS", checkSquare(action.y, action.z, updatedState));
      console.log("COORD", action.coord, "---y:", action.y, "---z:", action.z);
      return {
        ...state,
        ...updatedState,
        ...checkSquare(action.y, action.z, updatedState),
      };
    }
    default:
      return state;
  }
};
