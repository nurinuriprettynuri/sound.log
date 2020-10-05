export const PLAY = "PLAY";
export const PAUSE = "PAUSE";
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";

export const playTrack = (track) => ({
  type: PLAY,
  track,
});

export const pauseTrack = () => ({
  type: PAUSE,
});

export const setCurrentTrack = (track) => ({
  type: SET_CURRENT_TRACK,
  track,
});
