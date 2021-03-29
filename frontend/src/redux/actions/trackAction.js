import * as APIUtil from "../../util/trackApi";
import { closeModal } from "./modalAction";

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

export const removeTrack = (trackId) => ({
  type: REMOVE_TRACK,
  trackId,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_TRACK_ERRORS,
  errors,
});

export const clearTrackErrors = () => ({
  type: CLEAR_TRACK_ERRORS,
});

export const fetchAllTracks = () => (dispatch) =>
  APIUtil.fetchAllTracks()
    .then((res) => dispatch(receiveAllTracks(res.data)))
    .catch((err) => console.error(err));

export const fetchTrack = (trackId) => (dispatch) =>
  APIUtil.fetchTrack(trackId)
    .then((res) => dispatch(receiveTrack(res.data)))
    .catch((err) => console.error(err));

export const createTrack = (track) => (dispatch) =>
  APIUtil.createTrack(track)
    .then((res) => {
      dispatch(receiveTrack(res.data));
      dispatch(closeModal({ type: "loading", data: false }));
  })
    .catch((err) => console.error(err));

export const updateTrack = (track, id) => (dispatch) => {
  return APIUtil.updateTrack(track, id).then((res) => {
    dispatch(receiveTrack(res.data));
    dispatch(closeModal({ type: "loading", data: false }));
  });
};

export const deleteTrack = (id) => (dispatch) =>
  APIUtil.deleteTrack(id).then((res) => dispatch(removeTrack(res.data)));
