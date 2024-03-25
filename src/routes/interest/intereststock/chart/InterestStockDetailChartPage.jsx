import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailChartPage.css";
import SampleChart from "./SampleChart";
import StockDataFetcher from "./StockDataFetcher.js";
import { useEffect, useState } from "react";
import { fetchHankookStockBalance } from "../../../../lib/apis/hankookApi.jsx";
import { useParams } from "react-router-dom";
import { fetchPartyInfo } from "../../../../lib/apis/party.jsx";
import { fetchStockInfo } from "../../../../lib/apis/stock.jsx";

export default function InterestStockDetailChartPage() {
  const partyKey = useParams().partyKey;
  const stockKey = useParams().stockKey;
  const [stockInfo, setStockInfo] = useState([]);

  const [stockBalance, setStockBalance] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const stockInfo = await fetchStockInfo(stockKey);
        const fetchData = await fetchHankookStockBalance(partyKey, stockKey);
        const party = await fetchPartyInfo(partyKey);

        // console.log("client ", party);
        // console.log(stockInfo);
        setStockInfo(stockInfo);

        setStockBalance({
          data: fetchData,
          partyInfo: party,
        });
      } catch (error) {
        console.error(error);
        throw Error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {console.log(stockBalance)}
      <TopNavigationBar text={"종목 상세정보"} />
      <Container>
        <Row className="stock-detail-row">
          <div className="stock-detail-name">{stockInfo.stockName}</div>
          <div className="stock-detail-price">
            {parseInt(stockInfo.currentPrice).toLocaleString()}원
          </div>
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
        <StockDataFetcher stockBalance={stockBalance} />

        {stockBalance ? (
          <Row className="stock-detail-transaction-button">
            <Button className="stock-detail-sell-button">
              <div className="stock-detail-sell-text">판매하기</div>
            </Button>
            <Button className="stock-detail-buy-button">
              <div className="stock-detail-buy-text">구매하기</div>
            </Button>
          </Row>
        ) : (
          <Row className="stock-detail-transaction-button">
            <Button className="stock-detail-interest-button">
              <div className="stock-detail-interest-text">찜하기</div>
            </Button>
          </Row>
        )}
      </Container>
    </>
  );
}
