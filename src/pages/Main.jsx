import React from "react";
import Header from "../components/layout/Header";
import styled from "styled-components";

const Main = () => {
  return (
    <DivMainContainer>
      <Header />
      <div>메인</div>
    </DivMainContainer>
  );
};

const DivMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Main;
