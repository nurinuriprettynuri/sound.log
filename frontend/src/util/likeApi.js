import { instance } from "./axiosInstance";

export const fetchMostLiked = () => instance.get("/api/likes");

export const fetchLikesByUserId = (userId) =>
  instance.get(`/api/likes/${userId}`);

export const fetchLikeByUserId = (userId, trackId) =>
  instance.get(`/api/likes/${userId}/${trackId}`);

export const deleteLikeByUserId = (userId, trackId) =>
  instance.delete(`/api/likes/${userId}/${trackId}`);
