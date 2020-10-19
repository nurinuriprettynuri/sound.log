import { instance } from "./axiosInstance";

export const fetchAllTracks = () => instance.get(`/api/tracks`);

export const fetchTrack = (trackId) => instance.get(`/api/tracks/${trackId}`);

export const createTrack = (track) =>
  instance.post("/api/tracks", track, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateTrack = (track, id) =>
  instance.patch(`/api/tracks/${id}`, track);

export const deleteTrack = (id) => instance.delete(`/api/tracks/${id}`);
