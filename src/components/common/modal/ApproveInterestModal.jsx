import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import PrimaryButton from "../button/PrimaryButton";

// 모달 스타일을 설정합니다.
const customStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100%",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    top: "50%", // 모달을 화면 중앙에 위치시킵니다.
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none", // 테두리 없음
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 그림자
    borderRadius: "20px", // 모달 창 모서리를 둥글게 만듭니다.
    minWidth: "80vw", // 최대 너비
  },
};

const ApproveInterestModal = ({
  isOpen, // 필수
  closeModal, //필수
  stockName, //옵셔널
  buttonText, //필수
  color = "#375AFF",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div style={{ fontSize: "1.2rem", padding: "4vh 0" }}>
        <span style={{ fontWeight: 600 }}>{stockName}</span>
        <span>종목을 </span> <br />
        <span style={{ color: color, fontWeight: 600 }}>{buttonText}</span>
        <span>하시겠습니까?</span>
      </div>

      <PrimaryButton
        className="start-button"
        text={buttonText}
        minWidth="100%"
        onClick={closeModal}
        backgroundColor={color}
      />
    </Modal>
  );
};

export default ApproveInterestModal;
