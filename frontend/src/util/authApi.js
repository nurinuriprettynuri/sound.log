import axios from "axios";

export const register = (user) => axios.post(`/api/users`, user);

export const signin = (user) => axios.post(`/api/users/signin`, user);

export const fetchUser = (userId) => axios.get(`/api/users/${userId}`);

export const updateUser = (user, userId) =>
  axios.patch(`/api/users/${userId}`, user, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
  });
