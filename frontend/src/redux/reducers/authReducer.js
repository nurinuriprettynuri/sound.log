import merge from "lodash/merge";
import { SET_CURRENT_USER, SIGNOUT_CURRENT_USER } from "../actions/authAction";

const INITIAL_STATE = { userId: "" };

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return merge({}, state, { ...action.user });
    case SIGNOUT_CURRENT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
