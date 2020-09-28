import axios from "axios";

export const register = (user) =>
  axios.post(`http://localhost:8000/api/users`, user);

export const signin = (user) =>
  axios.post(`http://localhost:8000/api/users/signin`, user);

export const signout = () => axios.delete(`http://localhost:8000/api/users`);
