// store/actions.js
export const SET_USER_DATA = "SET_USER_DATA";
export const LOGOUT_USER = "LOGOUT_USER";

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

//Action creator for logout
export const logoutUser = () => ({
  type: LOGOUT_USER,
});
