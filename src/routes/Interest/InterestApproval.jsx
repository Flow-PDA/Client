import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import InterestButton from "../../components/common/button/InterestButton";
import "./InterestPage.css";
import HorizontalLine from "../../components/line/HorizontalLine";
const InterestApproval = () => {
  const interestStock = [
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
  ];

  return (
    <>
      <Container>
        {interestStock.map((data, index) => (
          <Row className="interest-list" key={index}>
            <Col xs={2} className="interest-date">
              {data.date}
            </Col>
            <Col xs={6}>
              <Row className="interest-company">{data.company}</Row>
              <Row className="interest-name">{data.name}</Row>
            </Col>
            <Col xs={4} className="interest-remove-button-col">
              <Button className="interest-remove-button">종목뺴기</Button>
            </Col>
            <HorizontalLine />
          </Row>
        ))}
      </Container>
    </>
  );
};

export default InterestApproval;
