import logo from "../assets/logo.svg";
import "./MainPage.css";
import PrimaryButton from "../components/common/button/PrimaryButton";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";

const MainPage = () => {
  const navigate = useNavigate();
  // const searchParams = new URLSearchParams(window.location.search);
  // const partyKey = searchParams.get(partyKey);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(location);
  // console.log(params.getAll("partyKey"));
  // console.log(location);
  // console.log();
  // useEffect(() => {
  //   console.log(searchParams.get("partyKey"));
  //   if (searchParams.get("partyKey") === "1") {
  //     setSearchParams("?partyKey=2");
  //   }
  // }, [searchParams]);

  // console.log(partyKey);

  return (
    <Container className="main-container">
      <Row>
        <Col className="main-title">
          <img src={logo} alt="Logo" />
          <h2>함께하는 투자</h2>
          <div>FLOW와 함께라면 쉬워요</div>
          <div>지금 모임을 만들고 투자를 시작해보세요!</div>
        </Col>
      </Row>
      <Row className="account-link">
        <Col>
          <PrimaryButton
            className="start-button"
            text="시작하기"
            minWidth="100%"
            onClick={(e) => navigate("/signup")}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ marginBottom: "2vh" }}>
          <span>이미 계정이 있나요? </span>
          <span className="login-button" onClick={(e) => navigate("/login")}>
            로그인
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
