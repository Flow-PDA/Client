import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailChartPage.css";
import SampleChart from "./SampleChart";

export default function InterestStockDetailChartPage() {
  return (
    <>
      <TopNavigationBar text={"종목 상세정보"} />
      <Container>
        <Row>
          <div className="interest-stock-detail-name">삼성전자</div>
          <div className="interest-stock-detail-price">73,300원</div>
        </Row>
        <Row className="interest-stock-detail-menu-row">
          <Col
            xs={2}
            className="interest-stock-detail-menu-button chart-button"
          >
            차트
          </Col>
          <Col xs={2} className="interest-stock-detail-menu-button">
            호가
          </Col>
          <Col xs={2} className="interest-stock-detail-menu-button">
            뉴스
          </Col>
        </Row>
        <Row>
          <Col>
            <SampleChart />
          </Col>
        </Row>
        <Row className="interest-stock-detail-date-row">
          <Col>
            <Button className="interest-stock-detail-date-button day">
              1일
            </Button>
          </Col>
          <Col>
            <Button className="interest-stock-detail-date-button week">
              1주
            </Button>
          </Col>
          <Col>
            <Button className="interest-stock-detail-date-button month">
              1달
            </Button>
          </Col>
          <Col>
            <Button className="interest-stock-detail-date-button three-month">
              3달
            </Button>
          </Col>
          <Col>
            <Button className="interest-stock-detail-date-button year">
              1년
            </Button>
          </Col>
        </Row>
        <Row className="interest-stock-detail-transaction-button">
          <Button className="interest-stock-detail-buy-button">판매하기</Button>
          <Button className="interest-stock-detail-sell-button">
            구매하기
          </Button>
        </Row>
      </Container>
    </>
  );
}
