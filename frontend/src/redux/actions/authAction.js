import * as APIUtil from "../../util/authApi";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SIGNOUT_CURRENT_USER = "SIGNOUT_CURRENT_USER";

export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  currentUser: payload.jwtToken,
  userId: payload.userId,
});

export const signoutCurrentUser = () => ({
  type: SIGNOUT_CURRENT_USER,
});

export const register = (user) => (dispatch) =>
  APIUtil.register(user).then((res) => dispatch(setCurrentUser(res.data)));

export const signin = (user) => (dispatch) =>
  APIUtil.signin(user).then((res) => dispatch(setCurrentUser(res.data)));

export const signout = () => (dispatch) =>
  APIUtil.signout().then(() => dispatch(signoutCurrentUser()));
