import { Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../lib/contexts/AuthContext";
import { fetchHankookStockCurrent } from "../../../../lib/apis/hankookApi";
import { SyncLoader } from "react-spinners";
import "./InterestStockDetailNewsPage.css";
import News from "../../../../components/common/news/News";

export default function InterestStockDetailNewsPage() {
  const { partyKey, stockKey } = useParams();
  const { throwAuthError } = useContext(AuthContext);
  const [stockInfo, setStockInfo] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(stockKey);
        const stock_info = await fetchHankookStockCurrent(stockKey); //현재가 불러오는 페이지
        setStockInfo(stock_info);
      } catch (error) {
        if (error.response.status === 401) {
          console.log("throws");
          throwAuthError();
        }
      }
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
      {console.log("sss")}
      <TopNavigationBar text={"종목 상세정보"} />
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
                {parseInt(stockInfo.stck_prpr).toLocaleString()}원
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
                {console.log(stockInfo)}
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
