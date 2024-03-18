import { Button, ButtonGroup } from "react-bootstrap";

const InterestButton = ({ text1, text2, minWidth, onClick, style }) => {
  return (
    <ButtonGroup
      aria-label="Basic example"
      style={{ backgroundColor: "#375AFF", minWidth: "100%" }}
    >
      <Button style={{ backgroundColor: "#375AFF", width: "50%" }}>
        {text1}
      </Button>
      <Button style={{ backgroundColor: "#375AFF", width: "50%" }}>
        {text2}
      </Button>
    </ButtonGroup>
  );
};

export default InterestButton;
