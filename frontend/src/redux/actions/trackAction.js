import * as APIUtil from "../../util/trackApi";

export const RECEIVE_ALL_TRACKS = "RECEIVE_ALL_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RECEIVE_TRACK_ERRORS = "RECEIVE_TRACK_ERRORS";
export const CLEAR_TRACK_ERRORS = "CLEAR_TRACK_ERRORS";

export const receiveAllTracks = (tracks) => ({
  type: RECEIVE_ALL_TRACKS,
  tracks,
});

export const receiveTrack = (track) => ({
  type: RECEIVE_TRACK,
  track: track,
});

export const removeTrack = (track) => ({
  type: REMOVE_TRACK,
  trackId: track.id,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_TRACK_ERRORS,
  errors,
});

export const clearTrackErrors = () => ({
  type: CLEAR_TRACK_ERRORS,
});

export const fetchAllTracks = () => (dispatch) =>
  APIUtil.fetchAllTracks().then(
    (res) => dispatch(receiveAllTracks(res.data)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );

export const fetchTrack = (id) => (dispatch) =>
  APIUtil.fetchTrack(id).then(
    (res) => dispatch(receiveTrack(res.data)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );

export const createTrack = (track) => (dispatch) =>
  APIUtil.createTrack(track).then(
    (res) => dispatch(receiveTrack(res.data)),
    (err) => {
      dispatch(receiveErrors(err.responseJSON));
    }
  );

export const updateTrack = (track, id) => (dispatch) => {
  return APIUtil.updateTrack(track, id).then(
    (track) => dispatch(receiveTrack(track)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );
};

export const deleteTrack = (id) => (dispatch) =>
  APIUtil.deleteTrack(id).then(
    (res) => dispatch(removeTrack(res.data)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );

export const likeTrack = (payload) => (dispatch) =>
  APIUtil.likeTrack(payload).then((res) => dispatch(receiveTrack(res.data)));
