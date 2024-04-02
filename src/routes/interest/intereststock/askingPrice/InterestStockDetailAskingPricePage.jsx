import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailAskingPrice.css";
import SampleAskingPriceChart from "./SampleAskingPriceChart";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../lib/contexts/AuthContext";
import io from "socket.io-client";
import { SyncLoader } from "react-spinners";
import { fetchPartyInfo } from "../../../../lib/apis/party";
import { getApproval } from "../../../../lib/apis/interest";
import TradeButton from "../../../../components/common/button/TradeButton";
import {
  fetchHankookStockBalance,
  fetchHankookStockCurrent,
} from "../../../../lib/apis/hankookApi";
import { fetchStockEndPrice } from "../../../../lib/apis/stock";

export default function InterestStockDetailAskingPricePage() {
  const navigate = useNavigate();
  const { throwAuthError } = useContext(AuthContext);
  const { partyKey, stockKey } = useParams();
  const [price, setPrice] = useState(0);
  const [yesterDayEndPrice, setYesterDayEndPrice] = useState(0);

  const [stockInfo, setStockInfo] = useState([]);
  const [stockBalance, setStockBalance] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간 상태 추가

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

        setStockExecutionPrice(data[1]);
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
    async function fetchData() {
      try {
        const stockInfo = await fetchHankookStockCurrent(stockKey);
        const fetchData = await fetchHankookStockBalance(partyKey, stockKey);
        const party = await fetchPartyInfo(partyKey);
        const mystock = await getApproval(partyKey).then((data) => {
          return data.data.result;
        });
        const stockEndPrice = await fetchStockEndPrice(stockKey);
        // console.log("sto", stockEndPrice);
        // console.log("aaa", stockEndPrice[0].closePrice);
        if (stockEndPrice) {
          setYesterDayEndPrice(stockEndPrice[0].closePrice);
        }

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
  }, [stockKey]);

  const handleChartButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/chart`);
  };

  const handleNewsButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/news`);
  };
  // console.log("전 영업일 종가", yesterDayEndPrice);
  return (
    <>
      <TopNavigationBar text={"종목 상세정보"} type={1} />
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
                {Number(stockExecutionPrice).toLocaleString()}원
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
              <Col
                xs={2}
                className="stock-detail-menu-button asking-price-button"
              >
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
              <SampleAskingPriceChart
                stockCode={stockKey}
                endPrice={yesterDayEndPrice}
                currentPrice={stockExecutionPrice}
                stockBalance={stockBalance}
                stockName={stockInfo.stockName}
              />
            </div>

            {/* {currentTime.getHours() >= 9 &&
              currentTime.getHours() < 15 &&
              (currentTime.getHours() !== 15 ||
                currentTime.getMinutes() < 30) && ( */}
            <TradeButton
              stockBalance={stockBalance}
              partyKey={partyKey}
              stockKey={stockKey}
              stockInfo={stockInfo}
            />
            {/* )} */}
          </>
        )}
      </Container>
    </>
  );
}
