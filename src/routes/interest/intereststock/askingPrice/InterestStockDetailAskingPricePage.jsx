import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../../../components/common/nav/TopNavigationBar";
import "./InterestStockDetailAskingPrice.css";
import SampleAskingPriceChart from "./SampleAskingPriceChart";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../lib/contexts/AuthContext";

import {
  fetchHankookStockBalance,
  fetchHankookStockCurrent,
} from "../../../../lib/apis/hankookApi";
import { SyncLoader } from "react-spinners";
import { fetchPartyInfo } from "../../../../lib/apis/party";
import { getApproval } from "../../../../lib/apis/interest";
import TradeButton from "../../../../components/common/button/TradeButton";

export default function InterestStockDetailAskingPricePage() {
  const navigate = useNavigate();
  const { throwAuthError } = useContext(AuthContext);
  const { partyKey, stockKey } = useParams();
  const [price, setPrice] = useState(0);

  const [stockInfo, setStockInfo] = useState([]);
  const [stockBalance, setStockBalance] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(stockKey);
        const stock_info = await fetchHankookStockCurrent(stockKey);
        const stock_balance = await fetchHankookStockBalance(
          partyKey,
          stockKey
        );
        const party = await fetchPartyInfo(partyKey);
        const mystock = await getApproval(partyKey).then((data) => {
          return data.data.result;
        });

        const isActive =
          mystock.find((data) => data.stockKey === stockKey) !== undefined;

        setStockInfo(stock_info);
        setStockBalance({
          data: stock_balance,
          partyInfo: party,
        });
      } catch (error) {
        console.log(error);
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

  const handleNewsButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/news`);
  };


  const handleBuyButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/tradeStock`, {
      state: {
        name: stockInfo.stockName,
        price: parseInt(stockInfo.stck_prpr).toLocaleString(),
        type: "구매",
      },
    });
  };

  const handleSellButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/tradeStock`, {
      state: {
        name: stockInfo.stockName,
        price: parseInt(stockInfo.stck_prpr).toLocaleString(),
        type: "판매",
      },
    });
  };


  return (
    <>
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
              <SampleAskingPriceChart name={stockInfo.stockName} />
            </div>

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
