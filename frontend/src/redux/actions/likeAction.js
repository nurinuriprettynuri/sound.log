import * as APIUtil from "../../util/likeApi";

export const RECEIVE_ALL_LIKES = "RECEIVE_ALL_LIKES";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const DELETE_LIKE = "DELETE_LIKE";
export const RECEIVE_MOST_LIKED = "RECEIVE_MOST_LIKED";

export const receiveAllLikes = (likedTracks) => ({
  type: RECEIVE_ALL_LIKES,
  likedTracks,
});

export const receiveMostLiked = (mostLiked) => ({
  type: RECEIVE_MOST_LIKED,
  mostLiked,
});

export const receiveLike = (likedTrack) => ({
  type: RECEIVE_LIKE,
  likedTrack,
});

export const deleteLike = (deleted) => ({
  type: DELETE_LIKE,
  deleted,
});

export const fetchLikesByUserId = (userId) => (dispatch) =>
  APIUtil.fetchLikesByUserId(userId).then((res) =>
    dispatch(receiveAllLikes(res.data))
  );

export const fetchLikeByUserId = (userId, trackId) => (dispatch) =>
  APIUtil.fetchLikeByUserId(userId, trackId).then((res) =>
    dispatch(receiveLike(res.data))
  );

export const deleteLikeByUserId = (userId, trackId) => (dispatch) =>
  APIUtil.deleteLikeByUserId(userId, trackId).then((res) =>
    dispatch(deleteLike(res.data))
  );

export const fetchMostLiked = () => (dispatch) =>
  APIUtil.fetchMostLiked().then((res) => dispatch(receiveMostLiked(res.data)));
