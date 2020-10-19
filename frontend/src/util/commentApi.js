import { instance } from "./axiosInstance";

export const fetchComments = (trackId) =>
  instance.get(`/api/comments/${trackId}`);

export const createComment = (comment) =>
  instance.post(`/api/comments`, comment);
