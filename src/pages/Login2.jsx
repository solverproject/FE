import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/login/LoginForm";

import LoginTitle from "../components/login/LoginTitle";
import LoginType from "../components/login/LoginType";

const Login2 = () => {
  return (
    <DivLoginContainer>
      <LoginTitle />
      <PsubTitle>Welcome!</PsubTitle>
      <LoginForm />
      <DivCheckID>
        <LinkTag to={"/"}>처음오셨나요?</LinkTag>
        <LinkTag to={"/signup"}>이메일로 가입하기</LinkTag>
      </DivCheckID>
      <DivEasyLogin>간편 로그인</DivEasyLogin>
      <LoginType />
    </DivLoginContainer>
  );
};

export default Login2;

const DivLoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: radial-gradient(50% 50% at 50% 50%, #1033ff 0%, #000000 100%);
`;
const PsubTitle = styled.p`
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  color: white;
`;

const DivCheckID = styled.div`
  display: flex;
  justify-content: space-between;
  width: 468px;
  margin: 20px auto;
`;

const LinkTag = styled(Link)`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: white;

  &:hover {
    text-decoration-line: underline;
  }
`;

const DivEasyLogin = styled.div`
  color: white;
`;
