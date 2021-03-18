import axios from 'axios';
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE';
export const SWITCH_TURN = 'SWITCH_TURN';
export const CALC_SCORE = 'CALC_SCORE';
export const CHECKSQUARE = 'CHECKSQUARE';
export const SPLITCOORD = 'SPLITCOORD';
export const PUTLINE = 'PUTLINE';
export const GET_LINE_COORDS = 'GETLINECOORDS';
export const PUSH_COORDS = 'PUSHCOORDS';
export const M_BOARD = 'MBOARD';
export const FETCH_USERS = 'FETCH_USERS';
export const setBoardSize = (size) => ({
  type: SET_BOARD_SIZE,
  size,
});
export const switchTurn = () => ({ type: SWITCH_TURN });
export const getLineCoords = (x, y, p) => ({ type: GET_LINE_COORDS, x, y, p });
export const pushCoords = () => ({ type: PUSH_COORDS });
export const calcSCore = () => ({ type: CALC_SCORE });
export const checkSquare = (y, z, coord) => ({
  type: CHECKSQUARE,
  y,
  z,
  coord,
});
export const splitCoord = (x, y, z) => ({ type: SPLITCOORD, x, y, z });
export const putLine = (coord) => ({ type: PUTLINE, coord });
export const mBoard = () => ({ type: PUTLINE });
export const getAllUsers = () => {
  return async (dispatch) => {
    let response = await fetch(`http://localhost:5000/users`);
    let users = await response.json();
    dispatch({
      type: FETCH_USERS,
      payload: users,
    });
    console.log(users);
    console.log(typeof users);
    alert(users.firstName);
  };
};
