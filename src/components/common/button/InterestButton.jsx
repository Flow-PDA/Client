import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const InterestButton = ({ text1, text2, minWidth, onClick, style }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
    // 클릭 이벤트가 있을 경우, 해당 버튼의 onClick 콜백 함수 호출
    if (onClick) {
      onClick(buttonIndex);
    }
  };

  return (
    <ButtonGroup
      aria-label="Basic example"
      style={{ backgroundColor: "#375AFF", minWidth: "100%" }}
    >
      <Button
        style={{
          backgroundColor: activeButton === 0 ? "#fff" : "#375AFF",
          color: activeButton === 0 ? "#375AFF" : "#fff",
          width: "50%",
        }}
        onClick={() => handleButtonClick(0)}
      >
        {text1}
      </Button>
      <Button
        style={{
          backgroundColor: activeButton === 1 ? "#fff" : "#375AFF",
          color: activeButton === 1 ? "#375AFF" : "#fff",
          width: "50%",
        }}
        onClick={() => handleButtonClick(1)}
      >
        {text2}
      </Button>
    </ButtonGroup>
  );
};

export default InterestButton;
