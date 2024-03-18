import { Container, Image, Nav, Navbar } from "react-bootstrap";
import BackButton from "../../../assets/back.png";
import "./TopNavigationBar.css";

const TopNavigationBar = ({ text }) => {
  return (
    <Navbar className="navbar">
      <Container className="navbar-container">
        <Navbar.Brand href="/" className="navbar-brand">
          <Image src={BackButton} alt="Back" />
        </Navbar.Brand>
        <Nav className="mx-auto">
          <Nav.Item className="nav-item-text">{text}</Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNavigationBar;
