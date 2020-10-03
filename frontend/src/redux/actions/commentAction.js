import * as APIUtil from "../../util/commentApi";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

export const fetchComments = (trackId) => (dispatch) =>
  APIUtil.fetchComments(trackId).then((res) =>
    dispatch(receiveComments(res.data))
  );

export const createComment = (comment) => (dispatch) =>
  APIUtil.createComment(comment).then((res) =>
    dispatch(receiveComment(res.data))
  );
