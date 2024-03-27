import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailChartPage.css";
import SampleChart from "./SampleChart";
import StockDataFetcher from "./StockDataFetcher.js";
import { useEffect, useState } from "react";
import {
  fetchHankookStockBalance,
  fetchHankookStockCurrent,
} from "../../../../lib/apis/hankookApi.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import party, { fetchPartyInfo } from "../../../../lib/apis/party.jsx";
import { getApproval, regist } from "../../../../lib/apis/interest.jsx";
import Modal from "../../../../components/common/modal/PrimaryModal.jsx";
import { SyncLoader } from "react-spinners";

export default function InterestStockDetailChartPage() {
  const partyKey = useParams().partyKey;
  const stockKey = useParams().stockKey;
  const [stockInfo, setStockInfo] = useState([]);
  const [stockBalance, setStockBalance] = useState([]);
  const [isInterestStock, setIsInterestStock] = useState(false);
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

        // console.log(stockKey);

        setIsInterestStock(isActive);
        setStockInfo(stockInfo);
        // console.log("interestStock ", isInterestStock);
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

  const handleAddToInterestStock = async (stockKey) => {
    console.log("Stock added to interest stock!");
    const reqBody = {
      stockKey: stockKey,
    };
    try {
      await regist(partyKey, reqBody);
      alert("등록완료");
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  };

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
        {stockInfo.length === 0 ? ( // stockInfo가 null인 경우 로딩 스피너 표시
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

            {stockBalance.data ? (
              <Row className="stock-detail-transaction-button">
                <Button className="stock-detail-sell-button">
                  <div className="stock-detail-sell-text">판매하기</div>
                </Button>
                <Modal />

                <Button className="stock-detail-buy-button">
                  <div className="stock-detail-buy-text">구매하기</div>
                </Button>
              </Row>
            ) : (
              <Row className="stock-detail-transaction-button">
                <Col>
                  <Button
                    className="stock-detail-interest-button"
                    onClick={() => handleAddToInterestStock(stockKey)}
                    disabled={isInterestStock === true}
                  >
                    <div className="stock-detail-interest-text">찜하기</div>
                  </Button>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </>
  );
}
