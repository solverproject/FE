import React from "react";
import Header from "../components/layout/Header";
import styled from "styled-components";
const MyPage = () => {
  return (
    <>
      <Header />
      <StMainImg>MyPage</StMainImg>
    </>
  );
};

export default MyPage;

const StMainImg = styled.div`
  background-color: blue;
`;
