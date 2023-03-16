import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { color } from "../utils/styles/color";

export default function Nav() {
  const navigate = useNavigate();

  const buttonNavHandler = (url = "") => {
    navigate(`/${url}`);
  };
  return (
    <>
      <button onClick={() => buttonNavHandler()}>S</button>
      <BtnNav
        fontSize={"18px"}
        color={color.mainBlue}
        underline={"underline"}
        onClick={() => buttonNavHandler("detail")}
      >
        질문하러 가기
      </BtnNav>
      <BtnNav>내 질문</BtnNav>
      <BtnNav>전체 질문</BtnNav>
      <BtnNav>My page</BtnNav>
      <BtnNav>Logout</BtnNav>
    </>
  );
}

const BtnNav = styled.button`
  background: none;
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || "black"};
  text-decoration-line: ${(props) => props.underline || "none"};
`;
