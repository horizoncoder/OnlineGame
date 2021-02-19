export const SET_BOARD_SIZE = "SET_BOARD_SIZE";
export const SWITCH_TURN = "SWITCH_TURN";
export const CALC_SCORE = "CALC_SCORE";
export const CHECKSQUARE = "CHECKSQUARE";
export const SPLITCOORD = "SPLITCOORD";
export const PUTLINE = "PUTLINE";
export const ENDGAME = "ENDGAME";

export const setBoardSize = (size) => ({ type: SET_BOARD_SIZE, size });
export const switchTurn = () => ({ type: SWITCH_TURN });
export const calcSCore = () => ({ type: CALC_SCORE });
export const endgame=()=>({type: ENDGAME});
export const checkSquare = (y, z, coord) => ({
  type: CHECKSQUARE,
  y,
  z,
  coord,
});
export const splitCoord = (x, y, z) => ({ type: SPLITCOORD, x, y, z });
export const putLine = (coord) => ({ type: PUTLINE, coord });
