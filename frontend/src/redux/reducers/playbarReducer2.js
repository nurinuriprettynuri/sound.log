import { PLAY, PAUSE } from "../actions/playbarAction";
import merge from "lodash/merge";

const defaultState = {
  currentTrack: { trackId: "", title: "", audioUrl: "" },
  isPlaying: false,
  currentTime: 0,
};

export const playbarReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case PLAY:
      return merge({}, state, {
        currentTrack: action.track,
        isPlaying: true,
      });

    case PAUSE:
      return merge({}, state, { isPlaying: false });
    default:
      return state;
  }
};
