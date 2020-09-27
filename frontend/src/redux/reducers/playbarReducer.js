import { PLAY, PAUSE } from "../actions/playbarAction";

import merge from "lodash/merge";

const defaultState = {
  currentTrack: { track_id: "" },
  isPlaying: false,
  currentTime: 0,
};

export const playbarReducer = (state = defaultState, action) => {
  const audio = document.getElementsByClassName("audio-player");
  const { currentTrack, isPlaying } = state;

  switch (action.type) {
    case PLAY:
      if (
        !currentTrack.track_id ||
        currentTrack.track_id !== action.track.track_id
      ) {
        audio[0].setAttribute("src", action.track.track_file);
        audio[0].play();
        return merge({}, state, {
          currentTrack: action.track,
          isPlaying: true,
        });
      } else {
        audio[0].play();
        return merge({}, state, { isPlaying: true });
      }
    case PAUSE:
      audio[0].pause();
      return merge({}, state, { isPlaying: false });
    default:
      return state;
  }
};
