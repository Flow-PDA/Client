import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";

// 모달 스타일을 설정합니다.
const customStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
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
    borderRadius: "8px", // 모달 창 모서리를 둥글게 만듭니다.
    maxWidth: "80%", // 최대 너비
  },
};

const PrimaryModal = ({ show, handleClose, contentText, buttonText }) => {
  return (
    <Modal
      show={show} // 모달 열림 상태를 받아옵니다.
      //   onHide={handleClose} // 모달을 닫는 함수를 받아옵니다.
      style={customStyles}
      contentLabel="모달 창 예제"
      onRequestClose={handleClose}
    >
      {/* <Modal.Header closeButton>
        <Modal.Title>모달 창</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <p>{contentText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrimaryModal;
