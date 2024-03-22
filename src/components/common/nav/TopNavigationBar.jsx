import { Container, Image, Nav, Navbar } from "react-bootstrap";
import BackButton from "../../../assets/back.png";
import "./TopNavigationBar.css";
import { useNavigate } from "react-router-dom";

const TopNavigationBar = ({ text }) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Navbar className="navbar">
      <Container className="navbar-container">
        <Navbar.Brand onClick={handleBackButtonClick} className="navbar-brand">
          <Image src={BackButton} alt="Back" />
        </Navbar.Brand>
        <Nav.Item className="nav-item-text">{text}</Nav.Item>
      </Container>
    </Navbar>
  );
};

export default TopNavigationBar;
