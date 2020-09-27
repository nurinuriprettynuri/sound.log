export const PLAY = "PLAY";
export const PAUSE = "PAUSE";

export const playTrack = (track) => ({
  type: PLAY,
  track,
});

export const pauseTrack = () => ({
  type: PAUSE,
});
