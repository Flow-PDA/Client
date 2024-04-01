import { Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../lib/contexts/AuthContext";
import { fetchHankookStockCurrent } from "../../../../lib/apis/hankookApi";
import { SyncLoader } from "react-spinners";
import "./InterestStockDetailNewsPage.css";
import News from "./News";
import io from "socket.io-client";

export default function InterestStockDetailNewsPage() {
  const { partyKey, stockKey } = useParams();
  const { throwAuthError } = useContext(AuthContext);
  const [stockInfo, setStockInfo] = useState([]);
  const [news, setNews] = useState([]);
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
        console.log(stockKey);
        const stock_info = await fetchHankookStockCurrent(stockKey); //현재가 불러오는 페이지
        setStockInfo(stock_info);
      } catch (error) {}
    }
    fetchData();
  }, []);

  const handleChartButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/chart`);
  };

  const handleAskingPriceButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/askingPrice`);
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
              height: "100vh",
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
              <Col
                xs={2}
                className="stock-detail-menu-button"
                onClick={handleChartButtonClick}
              >
                차트
              </Col>
              <Col
                xs={2}
                className="stock-detail-menu-button"
                onClick={handleAskingPriceButtonClick}
              >
                호가
              </Col>
              <Col xs={2} className="stock-detail-menu-button news-button">
                뉴스
              </Col>
            </Row>
            <Row>
              <Col className="sample-news-list-wrapper">
                <News
                  news={news}
                  setNews={setNews}
                  stockName={stockInfo.stockName}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
