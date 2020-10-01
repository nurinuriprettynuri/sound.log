import {
  RECEIVE_ALL_TRACKS,
  RECEIVE_TRACK,
  REMOVE_TRACK,
} from "../actions/trackAction";
import merge from "lodash/merge";

export const trackReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_ALL_TRACKS:
      action.tracks.forEach((track) => {
        newState[track.trackId] = track;
      });
      return newState;
    case RECEIVE_TRACK:
      return merge({}, state, { [action.track.trackId]: action.track });
    case REMOVE_TRACK:
      newState = merge({}, state);
      delete newState[action.trackId];
      return newState;
    default:
      return state;
  }
};
