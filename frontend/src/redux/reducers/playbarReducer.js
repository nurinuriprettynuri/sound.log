import { PLAY, PAUSE } from "../actions/playbarAction";
import merge from "lodash/merge";

const defaultState = {
  currentTrack: { trackId: "", title: "" },
  isPlaying: false,
  currentTime: 0,
};

export const playbarReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const audio = document.getElementsByClassName("audio-player");
  const { currentTrack, isPlaying } = state;

  switch (action.type) {
    case PLAY:
      if (
        !currentTrack.trackId ||
        currentTrack.trackId !== action.track.trackId
      ) {
        audio[0].setAttribute("src", action.track.audioUrl);
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
