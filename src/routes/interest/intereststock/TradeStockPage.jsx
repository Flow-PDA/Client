import { Container, Form, Image } from "react-bootstrap";
import LightningIcon from "../../../assets/lightning-bolt.png";
import "./TradeStockPage.css";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { useEffect, useState } from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { tradeStock } from "../../../lib/apis/hankookApi";
import io from "socket.io-client";
import { fetchPartyInfo } from "../../../lib/apis/party";

export default function TradeStockPage() {
  const navigate = useNavigate();

  const { partyKey, stockKey } = useParams();
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [isMarketPrice, setIsMarketPrice] = useState(false);

  const [partyInfo, setPartyInfo] = useState();

  const location = useLocation();
  const stockName = location.state.stockName;
  const stockPrice = location.state.stockPrice;
  const stockBalance = location.state.stockBalance.data;
  const type = location.state.type;

  const maxBuyQuantity = async () => {};
  const maxSellQuantity = async () => {};

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
    console.log("stockBalance", stockBalance);
    setPrice(stockPrice);
  }, []);

  const trade = async (transactionType) => {
    try {
      // transactionType, partyKey, stockKey, orderQuantity, orderPrice;
      console.log("price", price);
      console.log("amount", amount);

      if (transactionType === 0) {
        if (isMarketPrice) {
          //시장가 체크되어있으면
          setPrice(parseInt(stockExecutionPrice));
        }

        console.log(typeof price);

        if (parseInt(price * amount) > parseInt(deposit)) {
          const calculatedAmount = Math.floor(deposit / price);
          alert(
            `주문 가능한 금액을 초과했습니다! 최대 ${calculatedAmount}주 만큼 구매 가능합니다!`
          );
          return;
        } else {
          alert(
            `${stockName} ${parseInt(
              price
            ).toLocaleString()}원에 ${amount}주 구매 주문 성공`
          );
        }
      } else {
        console.log(amount, stockBalance.hldg_qty);
        if (parseInt(amount) > parseInt(stockBalance.hldg_qty)) {
          alert(`최대 ${stockBalance.hldg_qty}주 만큼 판매 가능합니다!`);
          return;
        } else {
          alert(
            `${stockName} ${parseInt(
              price
            ).toLocaleString()}원에 ${amount}주 판매 주문 성공`
          );
        }
      }
      await tradeStock(transactionType, partyKey, stockKey, amount, price);
      navigate(`/party/${partyKey}/myPartyTransactionDetail`);
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

  const setSellVolumePercentage = (percentage) => {
    if (percentage === "최대") {
      setAmount(stockBalance.hldg_qty.toString());
    } else {
      const calculatedAmount = Math.floor(
        (percentage / 100) * stockBalance.hldg_qty
      );
      setAmount(calculatedAmount.toString());
    }
  };

  const setBuyVolumePercentage = (percentage) => {
    if (isMarketPrice) {
      //시장가 체크되어있으면
      setPrice(parseInt(stockExecutionPrice));
    }
    const calculatedAmount = Math.floor(((percentage / 100) * deposit) / price);
    setAmount(calculatedAmount.toString());
  };

  // 숫자에 천 단위 구분 기호 추가하는 함수
  const addThousandSeparator = (value) => {
    // 숫자만 추출
    const number = value.replace(/\D/g, "");
    // 천 단위 구분 기호 추가
    return Number(number).toLocaleString();
  };

  // 천 단위 구분 기호를 제거하는 함수
  const removeThousandSeparator = (value) => {
    // 쉼표를 제거하여 반환
    return value.replace(/,/g, "");
  };

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
                  value={addThousandSeparator(price)}
                  // placeholder={`${parseInt(stockPrice).toLocaleString()}`}
                  onChange={(e) =>
                    setPrice(removeThousandSeparator(e.target.value))
                  }
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
              <>판매 가능 최대 {stockBalance.hldg_qty}주</>
            )}
          </div>
        </div>
        <div className="trade-volume-btns">
          <div
            className="trade-volume-btn"
            onClick={() => {
              type === "구매"
                ? setBuyVolumePercentage(10)
                : setSellVolumePercentage(10);
            }}
          >
            10%
          </div>
          <div
            className="trade-volume-btn"
            onClick={() => {
              type === "구매"
                ? setBuyVolumePercentage(25)
                : setSellVolumePercentage(25);
            }}
          >
            25%
          </div>
          <div
            className="trade-volume-btn"
            onClick={() => {
              type === "구매"
                ? setBuyVolumePercentage(50)
                : setSellVolumePercentage(50);
            }}
          >
            50%
          </div>
          <div
            className="trade-volume-btn"
            onClick={() => {
              type === "구매"
                ? setBuyVolumePercentage(100)
                : setSellVolumePercentage("최대");
            }}
          >
            최대
          </div>
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
