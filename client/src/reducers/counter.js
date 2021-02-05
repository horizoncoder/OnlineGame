import { INCREMENT, DECREMENT } from "../actions";

const initialState = {
  count: 2,
  name: "Dima",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      if (state.count > 14) {
        alert("Нельзя здать поле больше чем 16 на 16")
        return { ...state, count: state.count + 0 };
      }
      return { ...state, count: state.count + 2 };
    case DECREMENT:
      if (state.count < 2) {
        alert("Нельзя здать поле меньше чем 0 на 0");
        return { ...state, count: state.count - 0 };
      }

      return { ...state, count: state.count - 2 };

    default:
      return state;
  }
};
