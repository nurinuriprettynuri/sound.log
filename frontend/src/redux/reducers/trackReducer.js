import { RECEIVE_ALL_TRACKS, RECEIVE_TRACK } from "../actions/trackAction";
import merge from "lodash/merge";

export const trackReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_TRACKS:
      return action.tracks;
    case RECEIVE_TRACK:
      return merge({}, state, { [action.track.track_id]: action.track });
    default:
      return state;
  }
};
