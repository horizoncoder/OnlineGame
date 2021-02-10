export const SET_BOARD_SIZE = "SET_BOARD_SIZE";
export const SWITCH_TURN = "SWITCH_TURN";
export const CALC_SCORE = "CALC_SCORE";
export const CHECKSQUARE = "CHECKSQUARE";

export const setBoardSize = (size) => ({ type: SET_BOARD_SIZE, size });
export const switchTurn = () => ({ type: SWITCH_TURN });
export const calcSCore = () => ({ type: CALC_SCORE });
export const checkSquare = (y, z) => ({ type: CHECKSQUARE, y, z });