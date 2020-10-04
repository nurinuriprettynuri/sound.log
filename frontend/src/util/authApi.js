import axios from "axios";

export const register = (user) => axios.post(`api/users`, user);

export const signin = (user) => axios.post(`/api/users/signin`, user);

export const fetchUser = (userId) => axios.get(`/api/users/${userId}`);

export const updateUser = (user, id) => axios.patch(`/api/users/${id}`, user);
