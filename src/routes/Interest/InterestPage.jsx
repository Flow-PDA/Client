import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import InterestButton from "../../components/common/button/InterestButton";
import "./InterestPage.css";
const InterestPage = () => {
  return (
    <Container>
      <TopNavigationBar text={"종목 찜 목록"} />
      <InterestButton text1="승인중" text2="승인완료" />
      <Row>
        <Col xs={2}>3.6</Col>
        <Col xs={6}>
          <Row>삼성전자</Row>
          <Row>최투자</Row>
        </Col>
        <Col xs={4}>
          <Button>종목뺴기</Button>
        </Col>
        <hr />
      </Row>

      <Row>
        <Col xs={2}>3.6</Col>
        <Col xs={6}>
          <Row>삼성전자</Row>
          <Row>최투자</Row>
        </Col>
        <Col xs={4}>
          <Button>종목뺴기</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default InterestPage;
