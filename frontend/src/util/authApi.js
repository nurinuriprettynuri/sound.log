import { instance } from "./axiosInstance";

export const register = (user) => instance.post(`api/users`, user);

export const signin = (user) => instance.post(`/api/users/signin`, user);

export const fetchUser = (userId) => instance.get(`/api/users/${userId}`);

export const updateUser = (user, userId) =>
  instance.patch(`/api/users/${userId}`, user);
