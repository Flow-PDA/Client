import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailChartPage.css";
import SampleChart from "./SampleChart";
import StockDataFetcher from "./StockDataFetcher.js";
import {
  fetchHankookStockBalance,
  fetchHankookStockCurrent,
} from "../../../../lib/apis/hankookApi.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPartyInfo } from "../../../../lib/apis/party.jsx";
import { getApproval, regist } from "../../../../lib/apis/interest.jsx";
import { SyncLoader } from "react-spinners";
import TradeButton from "../../../../components/common/button/TradeButton.jsx";

export default function InterestStockDetailChartPage() {
  const partyKey = useParams().partyKey;
  const stockKey = useParams().stockKey;
  const [stockInfo, setStockInfo] = useState([]);
  const [stockBalance, setStockBalance] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const stockInfo = await fetchHankookStockCurrent(stockKey);
        const fetchData = await fetchHankookStockBalance(partyKey, stockKey);
        const party = await fetchPartyInfo(partyKey);
        const mystock = await getApproval(partyKey).then((data) => {
          return data.data.result;
        });

        const isActive =
          mystock.find((data) => data.stockKey === stockKey) !== undefined;

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

  const handleAskingPriceButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/askingPrice`, {
      state: { stockName: stockInfo.stockName },
    });
  };

  const handleNewsButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/news`);
  };

  return (
    <>
      {console.log(stockBalance)}
      <TopNavigationBar text={"종목 상세정보"} />
      <Container>
        {stockInfo.length === 0 ? (
          <div
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
            }}
          >
            <SyncLoader color="#375AFF" />
          </div>
        ) : (
          <>
            <Row className="stock-detail-row">
              <div className="stock-detail-name">{stockInfo.stockName}</div>
              <div className="stock-detail-price">
                {parseInt(stockInfo.stck_prpr).toLocaleString()}원
              </div>
            </Row>
            <Row className="stock-detail-menu-row">
              <Col xs={2} className="stock-detail-menu-button chart-button">
                차트
              </Col>
              <Col
                xs={2}
                className="stock-detail-menu-button"
                onClick={handleAskingPriceButtonClick}
              >
                {console.log(stockInfo)}
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

            <TradeButton
              stockBalance={stockBalance}
              partyKey={partyKey}
              stockKey={stockKey}
              stockInfo={stockInfo}
            />
          </>
        )}
      </Container>
    </>
  );
}
