import { Button } from "react-bootstrap";

const PrimaryButton = ({ text, minWidth, onClick, style }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        ...style,
        backgroundImage: "linear-gradient(-20deg, #375AFF 0%, #015fff 100%)",
        backgroundColor: "#375AFF",
        borderRadius: "7px",
        border: 0,
        minWidth: minWidth,
        minHeight: 59,
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
