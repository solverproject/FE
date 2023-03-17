import axios from "axios";
import { getCookie } from "./cookies";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    // const accessToken = getCookie("ACCESS_TOKEN");
    // config.headers["Authorization"] = accessToken;
    return config;
  },

  function (error) {
    console.log("데이터 보내는중 오류!");
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  function (config) {
    const accessToken = getCookie("ACCESS_TOKEN");
    config.headers["Authorization"] = accessToken;

    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);
export default instance;
