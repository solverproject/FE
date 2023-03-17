import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useState } from "react";
import Modal from "../modal/Modal";
import CreateModal from "../modal/CreateModal";

export default function QuestionDetail() {
  const { questionId } = useParams();
  const [isModal, setIsModal] = useState(false);
  const handleModal = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <DivQuestionContainer>
      <DivQuestionHeader>
        <h2>Title</h2>
        <button onClick={handleModal}>작성하기</button>
        {isModal && (
          <Modal onClose={handleModal} Body={<CreateModal />} width="300px" />
        )}
      </DivQuestionHeader>
      <DivQuestionInfo>
        <span>id : id</span>
        <span>팔로우 : 0</span>
      </DivQuestionInfo>
      <DivQuestionBody>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOykuFhBAsoRC9z6Y3G1LZfGOGGNWGAtVRneLmcBu-kUWw1d3gs0S8ejgR07_gUTpyTs&usqp=CAU"
          alt="이미지"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOykuFhBAsoRC9z6Y3G1LZfGOGGNWGAtVRneLmcBu-kUWw1d3gs0S8ejgR07_gUTpyTs&usqp=CAU"
          alt="이미지"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOykuFhBAsoRC9z6Y3G1LZfGOGGNWGAtVRneLmcBu-kUWw1d3gs0S8ejgR07_gUTpyTs&usqp=CAU"
          alt="이미지"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOykuFhBAsoRC9z6Y3G1LZfGOGGNWGAtVRneLmcBu-kUWw1d3gs0S8ejgR07_gUTpyTs&usqp=CAU"
          alt="이미지"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOykuFhBAsoRC9z6Y3G1LZfGOGGNWGAtVRneLmcBu-kUWw1d3gs0S8ejgR07_gUTpyTs&usqp=CAU"
          alt="이미지"
        />
      </DivQuestionBody>
    </DivQuestionContainer>
  );
}

const DivQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 40px;
`;

const DivQuestionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const DivQuestionInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const DivQuestionBody = styled.div`
  margin: 10px;
  gap: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
