import { Button, Col, Container, Row, Form, Image } from "react-bootstrap";
import LightningIcon from "../../../assets/lightning-bolt.png";
import "./TradeStockPage.css";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { useEffect, useState } from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import { useLocation, useParams } from "react-router-dom";
import { tradeStock } from "../../../lib/apis/hankookApi";
import io from "socket.io-client";
import { fetchPartyInfo } from "../../../lib/apis/party";

export default function TradeStockPage() {
  const { partyKey, stockKey } = useParams();
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [isMarketPrice, setIsMarketPrice] = useState(false);
  const [partyInfo, setPartyInfo] = useState();

  const location = useLocation();
  const stockName = location.state.stockName;
  const stockPrice = location.state.stockPrice;
  const type = location.state.type;

  const maxBuyQuantity = async () => {};

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

  const trade = async (transactionType) => {
    try {
      // transactionType, partyKey, stockKey, orderQuantity, orderPrice;
      console.log("price", price);
      console.log("amount", amount);
      const res = await tradeStock(
        transactionType,
        partyKey,
        stockKey,
        amount,
        price
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMarketPrice = () => {
    setIsMarketPrice(!isMarketPrice);
  };

  const callPartyInfo = async () => {
    try {
      const response = await fetchPartyInfo(partyKey);
      setPartyInfo(response);
    } catch (error) {
      console.error("모임 정보 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callPartyInfo();
  }, []);

  let deposit = 0;
  console.log(partyInfo);

  if (partyInfo) {
    deposit = partyInfo.deposit;
  }

  return (
    <>
      <TopNavigationBar text={stockName} />
      <Container className="trade-stock-container">
        <div className="trade-stock">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="trade-price-sentence">{type}할 가격</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2vh",
            }}
          >
            {isMarketPrice ? (
              <div className="trade-market-price-info">
                가장 빠른 가격에 주문할게요
              </div>
            ) : (
              <div className="trade-price">
                <input
                  className="trade-price trade-stock-price-input"
                  type="text"
                  value={price}
                  placeholder={`${parseInt(stockPrice).toLocaleString()}`}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            )}

            <div className="trade-current-price">
              {" "}
              <Image src={LightningIcon} className="lightning-icon" />
              {parseInt(stockExecutionPrice).toLocaleString()}원
              {/* 현재가 실시간으로 바뀌어야 함 */}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="trade-volume-ask-sentence">
              몇 주{" "}
              {type === "구매" ? (
                <>
                  <span className="red-text">구매</span>할까요?
                </>
              ) : (
                <>
                  {" "}
                  <span className="blue-text">판매</span>할까요?
                </>
              )}
            </div>

            {type === "구매" ? (
              <>
                <Form.Check
                  type={"checkbox"}
                  className="trade-market-price-btn"
                  onChange={toggleMarketPrice}
                  checked={isMarketPrice}
                />
                <div className="trade-market-price-sentence">시장가</div>
              </>
            ) : (
              <></>
            )}
          </div>
          <input
            className="trade-stock-input"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="trade-possible">
            {type === "구매" ? (
              <>
                {" "}
                구매 가능 {deposit.toLocaleString()}원 {}
              </>
            ) : (
              <>판매 가능 최대 -주</>
            )}
          </div>
        </div>
        <div className="trade-volume-btns">
          <div className="trade-volume-btn">10%</div>
          <div className="trade-volume-btn">25%</div>
          <div className="trade-volume-btn">50%</div>
          <div className="trade-volume-btn">최대</div>
        </div>

        <PrimaryButton
          text={type}
          minWidth="100%"
          backgroundColor={type === "구매" ? "#F46060" : "#375AFF"}
          className="trade-btn"
          onClick={() => trade(type === "구매" ? 0 : 1)}
        ></PrimaryButton>
      </Container>
    </>
  );
}
