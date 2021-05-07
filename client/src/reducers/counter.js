import { CALC_SCORE, GET_ROOM_ID } from "../actions";
import RoomDataService from "../services/room.service";
import AuthService from "../services/auth.service";

const checkBoxes = (state) => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser.id)
  const { lineCoordinates, boxColors } = state;
  const filledBoxes = {};
  Object.keys(lineCoordinates).forEach((coord) => {
    const splitCoord = coord.split("");
    const x = splitCoord[0]; // x кордината
    const y = splitCoord[1]; // y кордината
    const boxCount = filledBoxes[`${x}${y}`];
    if (!boxColors[`${x}${y}`]) {
      filledBoxes[`${x}${y}`] = boxCount ? boxCount + 1 : 1;
      console.log(boxColors)
      console.log("dddd")
    }
  });
  return Object.keys(filledBoxes).reduce((acc, key) => {
    if (filledBoxes[key] === 4) {
      acc[key] = `${state.turn}${currentUser.username}`;
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
  score: {},
  roomid: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "users8":
      console.log({ action });
      return {
        ...state,
        BoxsCoord: action.arr,
        coordsH: action.sortedCoordsH,
        coordsV: action.coordsV,
        count: action.count,
      };
    case "switchturn":
      return { ...state, turn: state.turn === "red" ? "blue" : "red" };


    case GET_ROOM_ID:
      console.log("sdhhs");
      return { ...state, roomid: action.id };


    case "putline":
      console.log(state.boxColors)
       {
      const newCoords = action.coord.reduce((acc, coord) => {
        if (!state.lineCoordinates[coord]) {
          acc[coord] = state.turn;
        }
        return acc;
      }, {});
      const newLineState = {
        ...state,
        lineCoordinates: { ...state.lineCoordinates, ...newCoords },
        numBlue:action.numBlue,
        numRed:action.numRed
      };
      const newBoxState = {
        ...newLineState,
        boxColors: {
          ...newLineState.boxColors,
          ...checkBoxes(newLineState),
        },
      };
      console.log(checkBoxes(newLineState))
      console.log(state.lineCoordinates)
      console.log(state.boxColors)
      console.log()
      console.log(action.numRed)
      return {
        ...state,
        ...state.lineCoordinates,
        rooomid: action.coord,
        ...state.numBlue,
        ...state.numRed,
        newLineState:action.newLineState,
        ...newBoxState,
      };
    }
    default:
      return state;
  }
};
