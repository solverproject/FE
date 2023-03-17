import React from "react";
import Header from "../components/layout/Header";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import { getCard } from "../api/api";
import Card from "./../components/card/Card";
const Main = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery("card", getCard);
  if (isLoading) {
    return <h2>로딩중</h2>;
  }
  if (isError) {
    return <h2>에러발생!!</h2>;
  }
  return (
    <>
      <Header />
      <StMainImg>
        <StBtn>질문하러 가기</StBtn>
      </StMainImg>
      <label>검색하기</label>
      <input type="text" placeholder="해시태그 검색" />
      {data?.map((item) => {
        return <Card item={item} />;
      })}
    </>
  );
};

export default Main;

const StMainImg = styled.div`
  background-color: blue;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBtn = styled.button`
  color: white;
  font-size: 30px;
`;
