import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import InterestButton from "../../components/common/button/InterestButton";
import "./InterestPage.css";
import HorizontalLine from "../../components/line/HorizontalLine";
const InterestPending = () => {
  const interestStock = [
    { date: "3.6", company: "삼성전자", name: "최투자", approve: "1/4" },
    { date: "3.6", company: "삼성전자", name: "최투자", approve: "1/4" },
    { date: "3.6", company: "삼성전자", name: "최투자", approve: "1/4" },
    { date: "3.6", company: "삼성전자", name: "최투자", approve: "1/4" },
    { date: "3.6", company: "삼성전자", name: "최투자", approve: "1/4" },
    { date: "3.6", company: "삼성전자", name: "최투자", approve: "1/4" },
    { date: "3.6", company: "삼성전자", name: "최투자", approve: "1/4" },
    { date: "3.6", company: "삼성전자", name: "최투자", approve: "1/4" },
  ];

  return (
    <>
      <Container>
        {interestStock.map((data, index) => (
          <Row className="interest-list" key={index}>
            <Col xs={2} className="interest-date">
              {data.date}
            </Col>
            <Col xs={4}>
              <Row className="interest-company">{data.company}</Row>
              <Row className="interest-name">{data.name}</Row>
            </Col>
            <Col xs={1} className="interest-approve">
              {data.approve}
            </Col>
            <Col xs={5} className="interest-button-group">
              <Button className="interest-yes-button">수락</Button>
              <Button className="interest-no-button">거절</Button>
            </Col>
            <HorizontalLine />
          </Row>
        ))}
      </Container>
    </>
  );
};

export default InterestPending;
