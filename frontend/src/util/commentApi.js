import axios from "axios";

export const fetchComments = (trackId) => axios.get(`/api/comments/${trackId}`);

export const createComment = (comment) => axios.post(`/api/comments`, comment);
