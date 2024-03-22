import { Col, Container, Row } from "react-bootstrap";
import "./StockDataFetcher.css";
import HorizontalLine from "../../../../components/line/HorizontalLine";
export default function StockDataFetcher() {
  return (
    <Container>
      <Row>
        <Col className="stock-data-partyname">177의 주식</Col>
      </Row>
      <Row className="stock-data-avg-row">
        <Col className="stock-data-avg">1주 평균 주식</Col>
        <Col className="stock-data-avg-data">69,000원</Col>
      </Row>
      <HorizontalLine />
      <Row>
        <Col className="stock-data-quantity">보유수량</Col>
        <Col className="stock-data-quantity-data">1주</Col>
      </Row>
      <HorizontalLine />
      <Row>
        <Col className="stock-data-total">총 금액</Col>
        <Col>
          <Row>
            <Col className="stock-data-total-data">73,300원</Col>
          </Row>
          <Row>
            <Col className="stock-data-total-profit">+3,600원(5.1)%</Col>
          </Row>
        </Col>
      </Row>
      <HorizontalLine />
    </Container>
  );
}
