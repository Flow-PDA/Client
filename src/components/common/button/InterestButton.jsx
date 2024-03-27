import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const InterestButton = ({ text1, text2, activeButton, onClick }) => {
  return (
    <ButtonGroup
      aria-label="Basic example"
      style={{ minWidth: "100%", margin: "25px 0" }}
    >
      <Button
        style={{
          backgroundColor: activeButton == !0 ? "#fff" : "#375AFF",
          color: activeButton == !0 ? "#375AFF" : "#fff",
          width: "50%",
        }}
        onClick={() => onClick(0)} // 첫 번째 버튼을 클릭했을 때 0을 전달
      >
        {text1}
      </Button>
      <Button
        style={{
          backgroundColor: activeButton == !1 ? "#fff" : "#375AFF",
          color: activeButton == !1 ? "#375AFF" : "#fff",
          width: "50%",
        }}
        onClick={() => onClick(1)} // 두 번째 버튼을 클릭했을 때 1을 전달
      >
        {text2}
      </Button>
    </ButtonGroup>
  );
};

export default InterestButton;
