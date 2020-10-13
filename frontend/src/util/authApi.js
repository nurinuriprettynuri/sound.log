import axios from "axios";

export const authToken = (token) => {
  if (token) {
    axios.defaults.headers.common["jwtToken"] = token;
  } else {
    delete axios.defaults.headers.common["jwtToken"];
  }
};

export const register = (user) => axios.post(`/api/users`, user);

export const signin = (user) => axios.post(`/api/users/signin`, user);

export const fetchUser = () => axios.get(`/api/users`);

export const updateUser = (user) => axios.patch(`/api/users`, user);
