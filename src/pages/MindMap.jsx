import React from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import MindMapMain from "../components/mindmap/MindMapMain";

export default function MindMap() {
  return (
    <DivContainer>
      <Header />
      <input type="text" placeholder="태그검색" />
      <DivMindMapContainer>
        {/* 마인드맵 컨테이너입니다 */}
        <MindMapMain />
      </DivMindMapContainer>
    </DivContainer>
  );
}

const DivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const DivMindMapContainer = styled.div`
  margin-top: 100px;
  width: 600px;
  height: 600px;
  background-color: gray;
`;
