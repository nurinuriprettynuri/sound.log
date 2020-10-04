import axios from "axios";

export const fetchAllTracks = () => axios.get(`/api/tracks`);

export const fetchTrack = (trackId) => axios.get(`/api/tracks/${trackId}`);

export const createTrack = (track) =>
  axios.post("/api/tracks", track, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateTrack = (track, id) =>
  axios.patch(`/api/tracks/${id}`, track);

export const deleteTrack = (id) => axios.delete(`/api/tracks/${id}`);
