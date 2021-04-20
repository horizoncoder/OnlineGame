import { CALC_SCORE, GET_ROOM_ID } from "../actions";
import RoomDataService from "../services/room.service";
import AuthService from "../services/auth.service";
const calcScore = (state) => ({
  Color: state.turn ? state.numRed : state.numBlue,
  // подсчет очков
  numRed: Object.values(state.boxColors).filter((color) => color === "red")
    .length, // считаем очки
  numBlue: Object.values(state.boxColors).filter((color) => color === "blue")
    .length,
});
const EndGame = (state, props) => {
  if (Object.keys(state.boxColors).length === state.count ** 2) {
    let winner = "Draw";
    if (state.numRed > state.numBlue) {
      winner = "PlayerRed";
    }
    if (state.numBlue > state.numRed) {
      winner = "PlayerBlue";
    }
    if (state.numBlue === state.numRed) {
      winner = "Draw";
    }
    alert("Игра закончена");
    console.log(props);
    document.location.reload();
    const data = {
      status: "ending",
      rednum: state.numRed,
      bluenum: state.numBlue,
      win: winner,
    };
    RoomDataService.update(state.roomid, data)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The room was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
const checkBoxes = (state) => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser.id)
  const { lineCoordinates, boxColors } = state;
  const filledBoxes = {};
  Object.keys(lineCoordinates).forEach((coord) => {
    const splitCoord = coord.split("");
    const x = splitCoord[0]; // x кордината
    const y = splitCoord[1]; // y кордината
    const boxCount = filledBoxes[`${x}${y} ${currentUser.username}`];
    if (!boxColors[`${x}${y} ${currentUser.username}`]) {
      filledBoxes[`${x}${y} ${currentUser.username}`] = boxCount ? boxCount + 1 : 1;
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

    case CALC_SCORE:
      return { ...state, numRed: action.numRed, ...calcScore(state) };

    case GET_ROOM_ID:
      console.log("sdhhs");
      return { ...state, roomid: action.id };

    case "calc":
      return { ...state, ...calcScore(state) };
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
      };
      const newBoxState = {
        ...newLineState,
        boxColors: {
          ...newLineState.boxColors,
          ...checkBoxes(newLineState),
        },
      };
      console.log(newLineState)
      console.log(action.newLineState)
      console.log(action.newBoxState)
      console.log(newLineState.boxColors)
      console.log(newCoords)
      return {
        ...state,
        rooomid: action.coord,
        newLineState:action.newLineState,
        ...newBoxState,
        ...calcScore(newBoxState),
        ...EndGame(newBoxState),
      };
    }
    default:
      return state;
  }
};
