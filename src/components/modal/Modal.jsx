import React, { useEffect } from "react";
import styled from "styled-components";
import Portal from "./Portal";

const Modal = ({ onClose, Body, width }) => {
  //모달창이 띄워지면 스크롤 금지
  useEffect(() => {
    //현재위치에 고정
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;
        `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  return (
    <Portal>
      <Background>
        <DivModalContainer width={width}>
          {Body}
          <ButtonClose onClick={onClose}>X</ButtonClose>
        </DivModalContainer>
      </Background>
    </Portal>
  );
};
export default Modal;

// 하단에는 styled-components 코드가 있음
const Background = styled.div`
  z-index: 999;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: #00000033;
`;

const DivModalContainer = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: 300px;
  border: 1px solid black;
  background-color: tomato;
  border-radius: 20px;
`;

const ButtonClose = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  cursor: pointer;
`;
