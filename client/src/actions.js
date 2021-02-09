export const BOARDSIX = "BOARDSIX";
export const TINT = "TINT";
export const UNTINT = "UNTINT";
export const SET_BOARD_SIZE = "SET_BOARD_SIZE";

export const tintAction = () => ({ type: TINT });
export const untintiAction = () => ({ type: UNTINT });
export const boardsixAction = () => ({ type: BOARDSIX });
export const setBoardSize = (size) => ({ type: SET_BOARD_SIZE, size });
