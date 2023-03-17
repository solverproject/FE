import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { setCookie } from "../api/cookies";
import { loginUser } from "../api/api.js";
import {
  KAKAO_REST_API_KEY,
  NAVER_REST_API_KEY,
  GOOGLE_REST_API_KEY,
} from "../api/api_key";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation(loginUser, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("user");
      setCookie("ACCESS_TOKEN", response.headers.authorization);
      // setCookie("RT_TOKEN", response.headers.rt_authorization);

      localStorage.setItem("name", response.data.username);
      console.log(response);
    },
    onError: () => {
      alert("로그인정보가 일치하지 않습니다.");
    },
  });
  //---카카오 로그인---
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  //---카카오 로그인 버튼---
  const onHandleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  //---네이버 로그인---
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`;

  //---네이버 로그인 버튼---
  const onHandleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  //---구글 로그인---
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${GOOGLE_REST_API_KEY}.apps.googleusercontent.com&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&service=lso&o2v=2&flowName=GeneralOAuthFlow`;

  //---구글 로그인 버튼---
  const onHandleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };
  //---일반 로그인 버튼---
  const onHandleLoginButton = async (event) => {
    event.preventDefault();
    const loginUser = {
      userEmail,
      password,
    };
    mutation.mutate(loginUser);
  };

  return (
    <>
      <form onSubmit={onHandleLoginButton}>
        <div>
          <input
            type="text"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            placeholder="이메일을 입력하세요"
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력하세요"
          />
          <br />
          <button>로그인 하기</button>
        </div>
      </form>
      <button onClick={onHandleKakaoLogin}>카카오로 로그인하기</button>
      <br />
      <button onClick={onHandleNaverLogin}>네이버로 로그인하기</button>
      <br />
      <button onClick={onHandleGoogleLogin}>구글로 로그인하기</button>
    </>
  );
};

export default Login;
