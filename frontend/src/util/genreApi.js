import axios from "axios";

export const fetchAllGenres = () => axios.get("/api/genres");

export const fetchGenre = (id) => axios.get(`/api/genres/${id}`);
