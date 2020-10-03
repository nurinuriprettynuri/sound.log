import axios from "axios";

export const fetchComments = (trackId) =>
  axios.get(`http://localhost:8000/api/comments/${trackId}`);

export const createComment = (comment) =>
  axios.post(`http://localhost:8000/api/comments`, comment);
