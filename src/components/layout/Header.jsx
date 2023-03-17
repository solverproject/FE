import React from "react";
import styled from "styled-components";
import Input from "../../utils/element/input";
import Nav from "../Nav";

export default function Header() {
  return (
    <DivHeaderContainer>
      <DivNav>
        <Nav />
      </DivNav>

      <DivInput>
        <Input />
      </DivInput>
    </DivHeaderContainer>
  );
}

const DivHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 80px;
`;

const DivNav = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;
const DivInput = styled.div`
  width: 50%;
`;
