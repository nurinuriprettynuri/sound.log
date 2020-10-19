import axios from "axios";

export const instance = axios.create({
  baseURL: "/",
});

instance.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken && accessToken !== "") {
    req.headers.authorization = "Bearer " + accessToken;
  }
  if (refreshToken && refreshToken !== "") {
    req.headers.refreshToken = "Bearer " + refreshToken;
  }
  return req;
});
