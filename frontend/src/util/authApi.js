import axios from "axios";

export const register = (user) => axios.post(`/api/users`, user);

export const signin = (user) => axios.post(`/api/users/signin`, user);

export const fetchUser = () =>
  axios.get(`/api/users`, {
    headers: { authorization: "Bearer " + localStorage.getItem("jwtToken") },
  });

export const updateUser = (user) =>
  axios.patch(`/api/users`, user, {
    headers: { authorization: "Bearer " + localStorage.getItem("jwtToken") },
  });
