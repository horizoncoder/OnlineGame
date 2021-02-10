export const BOARDSIX = "BOARDSIX";
export const TINT = "TINT";
export const UNTINT = "UNTINT";
export const SET_BOARD_SIZE = "SET_BOARD_SIZE";
export const SWITCH_TURN = "SWITCH_TURN";
export const CALC_SCORE = "CALC_SCORE";

export const tintAction = () => ({ type: TINT });
export const untintiAction = () => ({ type: UNTINT });
export const boardsixAction = () => ({ type: BOARDSIX });
export const setBoardSize = (size) => ({ type: SET_BOARD_SIZE, size });
export const switchTurn = () => ({ type: SWITCH_TURN });
export const calcSCore = () => ({ type: CALC_SCORE });
