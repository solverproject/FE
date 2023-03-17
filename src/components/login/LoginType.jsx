import React from "react";
import styled from "styled-components";

export default function LoginType() {
  return (
    <ButtonLoginContainer>
      <BtnLogo>구글</BtnLogo>
      <BtnLogo>네이버</BtnLogo>
      <BtnLogo>카카오</BtnLogo>
    </ButtonLoginContainer>
  );
}

const ButtonLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  margin: 20px;
`;

const BtnLogo = styled.button`
  width: 74px;
  height: 74px;
  border: 1px solid #ffffff;
  background: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
`;
