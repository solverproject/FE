import React from "react";
import styled from "styled-components";
import { Resizable } from "re-resizable";
import QuestionDetail from "../components/questionDetail/QuestionDetail";
import Chat from "../components/chat/Chat";
import Header from "../components/layout/Header";

export default function Detail() {
  return (
    <DivDetailContainer>
      <Header />
      <DivContainer>
        <DivLeft>
          <QuestionDetail />
        </DivLeft>
        <Resizable
          defaultSize={{ width: "50%", height: "100%" }}
          minWidth={"30%"}
          maxWidth={"70%"}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          handleStyles={{
            left: {
              width: "3px",
              height: "100%",
              backgroundColor: "#d1d5db",
            },
          }}
        >
          <DivRight>
            <Chat />
          </DivRight>
        </Resizable>
      </DivContainer>
    </DivDetailContainer>
  );
}
const DivDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
//re-resizable 사용
const DivContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: gray;
`;

const DivLeft = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
  }
`;

const DivRight = styled.div`
  /* margin-left: 20px; */
  height: 100vh;
`;
