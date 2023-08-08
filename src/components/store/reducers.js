// store/reducers.js
import { SET_USER_DATA, LOGOUT_USER } from "./actions";

const initialState = {
  userData: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
