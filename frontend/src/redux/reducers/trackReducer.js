import {
  RECEIVE_ALL_TRACKS,
  RECEIVE_TRACK,
  REMOVE_TRACK,
} from "../actions/trackAction";
import {
  RECEIVE_ALL_LIKES,
  RECEIVE_LIKE,
  DELETE_LIKE,
  RECEIVE_MOST_LIKED,
} from "../actions/likeAction";
import merge from "lodash/merge";

export const trackReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_ALL_TRACKS:
      action.tracks.forEach((track) => {
        newState[track.trackId] = { ...newState[track.trackId], ...track };
      });
      return newState;
    case RECEIVE_ALL_LIKES:
      newState = merge({}, state);
      action.likedTracks.forEach((e) => (newState[e].liked = true));
      return newState;

    case RECEIVE_MOST_LIKED:
      newState = merge({}, state);

      action.mostLiked.forEach((e) => (newState[e].trendy = true));
      return newState;
    case RECEIVE_LIKE:
      newState = merge({}, state);
      newState[action.likedTrack].liked = true;
      return newState;
    case RECEIVE_TRACK:
      const newTrack = merge({}, state[action.track.trackId], action.track);
      newState = merge({}, state);
      newState[action.track.trackId] = newTrack;

      return newState;
    case REMOVE_TRACK:
      newState = merge({}, state);
      delete newState[action.trackId];
      return newState;
    case DELETE_LIKE:
      newState = merge({}, state);
      newState[action.deleted].liked = false;
      return newState;
    default:
      return state;
  }
};
