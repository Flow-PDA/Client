import { Button } from "react-bootstrap";

const PrimaryButton = ({
  text,
  minWidth,
  minHeight = "1vh",
  onClick,
  style,
  disabled,
  backgroundColor = "#375AFF",
}) => {
  return (
    <Button
      onClick={onClick}
      style={{
        ...style,
        backgroundImage: `linear-gradient(-20deg, ${backgroundColor} 0%, ${backgroundColor} 100%)`,
        borderRadius: "7px",
        border: 0,
        minWidth: minWidth,
        minHeight: minHeight,
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "bold",
      }}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
