import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailAskingPrice.css";
import SampleAskingPriceChart from "./SampleAskingPriceChart";

export default function InterestStockDetailAskingPricePage() {
  return (
    <>
      <TopNavigationBar text={"종목 상세정보"} />
      <Container>
        <Row className="stock-detail-row">
          <div className="stock-detail-name">삼성전자</div>
          <div className="stock-detail-price">73,300원</div>
        </Row>
        <Row className="stock-detail-menu-row">
          <Col xs={2} className="stock-detail-menu-button ">
            차트
          </Col>
          <Col xs={2} className="stock-detail-menu-button asking-price-button">
            호가
          </Col>
          <Col xs={2} className="stock-detail-menu-button">
            뉴스
          </Col>
        </Row>
        <hr />
        <div className="sample-asking-price-chart-wrapper">
          <SampleAskingPriceChart />
        </div>

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
