import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";

import { color } from "../../utils/styles/color";
import { loginUser } from "../../api/api";
import { setCookie } from "../../api/cookies";

export default function LoginForm() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(loginUser, {
    onSuccess: (response) => {
      console.log(response);
      setCookie("ACCESS_TOKEN", response.headers.authorization.split(" ")[1]);
      localStorage.setItem(
        "REFRESH_TOKEN",
        response.headers.refresh_token.split(" ")[1]
      );
      localStorage.setItem("name", response.data.data);

      alert("login!");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const HandlerEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const HandlerPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const HandlerSubmit = (e) => {
    e.preventDefault();
    const loginUser = {
      userEmail,
      password,
    };
    loginMutation.mutate(loginUser);
  };
  return (
    <FormContainer onSubmit={HandlerSubmit}>
      <InputTag
        type="text"
        placeholder="이메일을 입력하세요. (ex. solver@gamil.com)"
        value={userEmail}
        onChange={HandlerEmailChange}
      />
      <InputTag
        type="text"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={HandlerPasswordChange}
      />
      <BtnLogin>Log In</BtnLogin>
    </FormContainer>
  );
}
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 468px;
`;

const InputTag = styled.input`
  width: 100%;
  height: 60px;
  border: 2px solid white;
  background: none;
  color: white;
  ::-webkit-input-placeholder {
    color: white; // 웹킷 브라우저(Chrome, Safari, Opera 등)의 경우 이렇게 설정합니다.
  }
`;

const BtnLogin = styled.button`
  width: 100%;
  height: 70px;
  color: white;
  background-color: ${color.mainPink};
  border-radius: 35px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
`;
