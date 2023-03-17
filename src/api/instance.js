import axios from "axios";
import chalk from "chalk";
import { getCookie, removeCookie, setCookie } from "./cookies";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  //요청을 보내기 전 수행
  (config) => {
    // // 토큰을 요청이 시작될 때 가져옴
    const accessToken = getCookie("ACCESS_TOKEN");
    const refresh_token = localStorage.getItem("REFRESH_TOKEN");

    // // 요청 config headers에 토큰모두(refresh, access) 넣어 줌
    if (accessToken && refresh_token) {
      console.log("둘다있음");
      config.headers["authorization"] = `Bearer ${accessToken}`;
      config.headers["refresh_token"] = `Bearer ${refresh_token}`;
    }
    // console.log(config);
    return config;
    // config.headers["Authorization"] = accessToken;
    // // config.headers["RT_Authorization"] = accessToken;

    // return config;
  },

  // 오류 요청을 보내기 전 수행
  (error) => {
    console.log("데이터 보내는중 오류!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  //서버로부터 정상 응답을 받는 경우
  (response) => {
    //request에 토큰 두개 담아서 보냈으니? access가 만료되었으면 알아서 access를 재발급해준다고 하였음.
    // 그럼 우선적으로 access_token을 받아와 기존 Cookie에 저장되어있는 값이랑 비교해서 다르면 교체?
    // 그럼 refresh까지 만료되었다면? 어떤 메시지를 줄것인가?
    console.log("intercepter response", response);
    const access_token = getCookie("ACCESS_TOKEN");
    if (response.headers.authorization) {
      console.log("토큰 받앗다?");
      const re_access_token = response.headers.authorization.split(" ")[1];
      if (access_token != re_access_token) {
        setCookie("ACCESS_TOKEN", re_access_token);
      }
    } else {
      console.log("토큰 어없다?");
    }

    return response;
  },

  (error) => {
    if (error.response.status === 400) {
      alert("데이터 수신중에 오류!");
    }

    if (error.response.statusCode === 401) {
      alert("refresh_token만료 재로그인하세요!");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("name");
      removeCookie("ACCESS_TOKEN");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default instance;
