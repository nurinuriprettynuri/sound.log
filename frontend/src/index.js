import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { configStore } from "./redux/store";
import { signout } from "./redux/actions/authAction";
import { instance } from "./util/axiosInstance";

const { store, persistor } = configStore();
const { dispatch } = store;
const UNAUTHORIZED = 403;

instance.interceptors.response.use(
  (response) => {
    const { accessToken, refreshToken } = response.data;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const { status } = error.response;

    if (status === UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;
      return instance
        .post("/api/users/auth", {
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((res) => {
          if (res.status === 201) {
            instance.defaults.headers.common["authorization"] =
              "Bearer " + localStorage.getItem("accessToken");

            return instance(originalRequest);
          } else {
            return dispatch(signout());
          }
        });
    }
    return dispatch(signout());
  }
);

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
