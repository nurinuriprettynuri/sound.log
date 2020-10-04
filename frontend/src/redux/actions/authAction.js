import * as APIUtil from "../../util/authApi";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SIGNOUT_CURRENT_USER = "SIGNOUT_CURRENT_USER";

export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  user: payload,
});

export const signoutCurrentUser = () => ({
  type: SIGNOUT_CURRENT_USER,
});

export const register = (user) => (dispatch) =>
  APIUtil.register(user).then((res) => dispatch(setCurrentUser(res.data)));

export const signin = (user) => (dispatch) =>
  APIUtil.signin(user).then((res) => dispatch(setCurrentUser(res.data)));

export const signout = (userId) => (dispatch) => () =>
  dispatch(signoutCurrentUser(userId));

export const fetchUser = (userId) => (dispatch) =>
  APIUtil.fetchUser(userId).then((res) => dispatch(setCurrentUser(res.data)));

export const updateUser = (user, id) => (dispatch) =>
  APIUtil.updateUser(user, id).then((res) =>
    dispatch(setCurrentUser(res.data))
  );
