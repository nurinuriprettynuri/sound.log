import merge from "lodash/merge";
import { RECEIVE_ARTIST } from "../actions/artistAction";

const INITIAL_STATE = {};

export const artistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_ARTIST:
      return merge({}, state, { [action.artist.userId]: action.artist });
    default:
      return state;
  }
};
