import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailAskingPrice.css";
import SampleAskingPriceChart from "./SampleAskingPriceChart";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHankookStockCurrent } from "../../../../lib/apis/hankookApi";

export default function InterestStockDetailAskingPricePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { partyKey, stockKey } = useParams();

  const [stockInfo, setStockInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log(stockKey);
      const fetchData = await fetchHankookStockCurrent(stockKey);
      setStockInfo(fetchData);
    }
    fetchData();
  }, []);

  const handleChartButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/chart`);
  };

  const handleNewsButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/news`);
  };

  return (
    <>
      <TopNavigationBar text={"종목 상세정보"} />
      <Container>
        <Row className="stock-detail-row">
          <div className="stock-detail-name">{stockInfo.stockName}</div>
          <div className="stock-detail-price">
            {parseInt(stockInfo.stck_prpr).toLocaleString()}원
          </div>
        </Row>
        <Row className="stock-detail-menu-row">
          <Col
            xs={2}
            className="stock-detail-menu-button "
            onClick={() => handleChartButtonClick()}
          >
            차트
          </Col>
          <Col xs={2} className="stock-detail-menu-button asking-price-button">
            호가
          </Col>
          <Col
            xs={2}
            className="stock-detail-menu-button"
            onClick={handleNewsButtonClick}
          >
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
