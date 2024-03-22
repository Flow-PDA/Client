import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailChartPage.css";
import SampleChart from "./SampleChart";
import StockDataFetcher from "./StockDataFetcher.js";

export default function InterestStockDetailChartPage() {
  return (
    <>
      <TopNavigationBar text={"종목 상세정보"} />
      <Container>
        <Row className="stock-detail-row">
          <div className="stock-detail-name">삼성전자</div>
          <div className="stock-detail-price">73,300원</div>
        </Row>
        <Row className="stock-detail-menu-row">
          <Col xs={2} className="stock-detail-menu-button chart-button">
            차트
          </Col>
          <Col xs={2} className="stock-detail-menu-button">
            호가
          </Col>
          <Col xs={2} className="stock-detail-menu-button">
            뉴스
          </Col>
        </Row>
        <Row>
          <Col>
            <SampleChart />
          </Col>
        </Row>
        <Row className="stock-detail-date-row">
          <Col>
            <Button className="stock-detail-date-button day">1일</Button>
          </Col>
          <Col>
            <Button className="stock-detail-date-button week">1주</Button>
          </Col>
          <Col>
            <Button className="stock-detail-date-button month">1달</Button>
          </Col>
          <Col>
            <Button className="stock-detail-date-button three-month">
              3달
            </Button>
          </Col>
          <Col>
            <Button className="stock-detail-date-button year">1년</Button>
          </Col>
        </Row>
        <StockDataFetcher />
        <Row className="stock-detail-transaction-button">
          <Button className="stock-detail-sell-button">
            <div className="stock-detail-sell-text">판매하기</div>
          </Button>
          <Button className="stock-detail-buy-button">
            <div className="stock-detail-buy-text">구매하기</div>
          </Button>
        </Row>
      </Container>
    </>
  );
}
