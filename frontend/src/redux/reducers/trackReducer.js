import { RECEIVE_ALL_TRACKS, RECEIVE_TRACK } from "../actions/trackAction";
import merge from "lodash/merge";

export const trackReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_TRACKS:
      let newState = {};
      action.tracks.forEach((track) => {
        newState[track.trackId] = track;
      });
      return newState;
    case RECEIVE_TRACK:
      return merge({}, state, { [action.track.trackId]: action.track });
    default:
      return state;
  }
};
