import axios from "axios";

export const fetchMostLiked = () => axios.get("/api/likes");

export const fetchLikesByUserId = (userId) => axios.get(`/api/likes/${userId}`);

export const fetchLikeByUserId = (userId, trackId) =>
  axios.get(`/api/likes/${userId}/${trackId}`);

export const deleteLikeByUserId = (userId, trackId) =>
  axios.delete(`/api/likes/${userId}/${trackId}`);
