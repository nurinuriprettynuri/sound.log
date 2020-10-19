import { instance } from "./axiosInstance";

export const fetchAllGenres = () => instance.get("/api/genres");

export const fetchGenre = (id) => instance.get(`/api/genres/${id}`);
