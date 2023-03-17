import React from "react";
import styled from "styled-components";

export default function Input() {
  return (
    <DivInputContainer>
      <InputSt type="text" placeholder="검색어를 입력하세요" />
      <SvgSt width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.6818 23.6245L14.0455 15.9772C13.3636 16.5235 12.5795 16.9559 11.6932 17.2745C10.8068 17.5932 9.86364 17.7525 8.86364 17.7525C6.38636 17.7525 4.29 16.8935 2.57455 15.1756C0.858182 13.4568 0 11.357 0 8.87624C0 6.39545 0.858182 4.29565 2.57455 2.57684C4.29 0.858947 6.38636 0 8.86364 0C11.3409 0 13.4377 0.858947 15.1541 2.57684C16.8695 4.29565 17.7273 6.39545 17.7273 8.87624C17.7273 9.87767 17.5682 10.8222 17.25 11.7098C16.9318 12.5974 16.5 13.3826 15.9545 14.0654L23.625 21.7468C23.875 21.9972 24 22.3044 24 22.6686C24 23.0327 23.8636 23.3513 23.5909 23.6245C23.3409 23.8748 23.0227 24 22.6364 24C22.25 24 21.9318 23.8748 21.6818 23.6245ZM8.86364 15.0213C10.5682 15.0213 12.0173 14.4241 13.2109 13.2297C14.4036 12.0344 15 10.5832 15 8.87624C15 7.16927 14.4036 5.71812 13.2109 4.52279C12.0173 3.32836 10.5682 2.73115 8.86364 2.73115C7.15909 2.73115 5.71 3.32836 4.51636 4.52279C3.32364 5.71812 2.72727 7.16927 2.72727 8.87624C2.72727 10.5832 3.32364 12.0344 4.51636 13.2297C5.71 14.4241 7.15909 15.0213 8.86364 15.0213Z"
          fill="#1033FF"
        />
      </SvgSt>
    </DivInputContainer>
  );
}

const DivInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 372px;
  height: 52px;
  border: 3px solid #1033ff;
  border-radius: 32px;
  margin: 0 auto;
`;

const InputSt = styled.input`
  margin-left: 20px;
  border: none;
`;

const SvgSt = styled.svg`
  margin-right: 20px;
`;
