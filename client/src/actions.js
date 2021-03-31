export const CALC_SCORE = "CALC_SCORE";
export const CHECKSQUARE = "CHECKSQUARE";
export const GET_ROOM_ID = "GET_ROOM_ID";

export const getRoomid = (id) => ({ type: GET_ROOM_ID, id });

export const calcSCore = () => ({ type: CALC_SCORE });
export const checkSquare = (y, z, coord) => ({
  type: CHECKSQUARE,
  y,
  z,
  coord,
});
