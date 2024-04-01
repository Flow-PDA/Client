import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailChartPage.css";
import SampleChart from "./SampleChart";
import StockDataFetcher from "./StockDataFetcher.jsx";
import io from "socket.io-client";
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
  const [chartMode, setChartMode] = useState("day");

  const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간 상태 추가
  const [chartMode, setChartMode] = useState("day");

  const navigate = useNavigate();

  // state for socketIo
  const [socketIo, setSocketIo] = useState(null);

  let [stockExecutionPrice, setStockExecutionPrice] = useState(0);
  // when mounted
  useEffect(() => {
    // socketIo init.
    const WS_URL = import.meta.env.VITE_WS_URL;
    if (WS_URL !== undefined) {
      const _socketIo = io.connect(WS_URL);
      _socketIo.on("connect", () => {
        console.log("socket connected");
      });
      _socketIo.on("update", (data) => {
        //console.log(data);
        if (data[1] !== stockExecutionPrice) {
          setStockExecutionPrice(data[1]);
        }
        // console.log(stockExecutionPrice);
      });

      setSocketIo(_socketIo);
    } else {
      console.log("WS URL not defined");
    }
  }, []);

  // when socketIo modified
  useEffect(() => {
    if (socketIo !== null) {
      // socketIo initiated
      // 2|005930 - 삼성전자 호가, 1|005930 - 삼성전자 체결가
      const temp = `1|${stockKey}`;
      // REGISTER_SUB : 등록, RELEASE_SUB : 해제
      socketIo.emit("REGISTER_SUB", temp);
    }
  }, [socketIo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // 매 초마다 현재 시간 업데이트
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 해제
  }, []);

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
      <TopNavigationBar text={"종목 상세정보"} type={1} />
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
                {parseInt(stockExecutionPrice).toLocaleString()}원
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
                {/* {console.log(stockInfo)} */}
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
                <SampleChart
                  mode={chartMode}
                  stockKey={stockKey}
                  price={stockExecutionPrice}
                />
              </Col>
            </Row>
            <Row className="stock-detail-date-row">
              <Col>
                <Button
                  className={
                    "stock-detail-date-button day" +
                    (chartMode === "day" ? " hovered" : "")
                  }
                  onClick={() => setChartMode("day")}
                >
                  1일
                </Button>
              </Col>
              <Col>
                <Button
                  className={
                    "stock-detail-date-button week" +
                    (chartMode === "week" ? " hovered" : "")
                  }
                  onClick={() => setChartMode("week")}
                >
                  1주
                </Button>
              </Col>
              <Col>
                <Button
                  className={
                    "stock-detail-date-button three-month" +
                    (chartMode === "3month" ? " hovered" : "")
                  }
                  onClick={() => setChartMode("3month")}
                >
                  3달
                </Button>
              </Col>
              <Col>
                <Button
                  className={
                    "stock-detail-date-button year" +
                    (chartMode === "year" ? " hovered" : "")
                  }
                  onClick={() => setChartMode("year")}
                >
                  1년
                </Button>
              </Col>
            </Row>
            <StockDataFetcher stockBalance={stockBalance} />

            {currentTime.getHours() >= 9 &&
              currentTime.getHours() < 15 &&
              (currentTime.getHours() !== 15 ||
                currentTime.getMinutes() < 30) && (
                <TradeButton
                  stockBalance={stockBalance}
                  partyKey={partyKey}
                  stockKey={stockKey}
                  stockInfo={stockInfo}
                />
              )}
          </>
        )}
      </Container>
    </>
  );
}
