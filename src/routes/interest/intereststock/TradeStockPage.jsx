import { Button, Col, Container, Row, Form, Image } from "react-bootstrap";
import LightningIcon from "../../../assets/lightning-bolt.png";
import "./TradeStockPage.css";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { useState } from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import { useLocation } from "react-router-dom";

export default function TradeStockPage() {
  const [price, setPrice] = useState("");

  const location = useLocation();
  const stockName = location.state.stockName;
  const stockPrice = location.state.stockPrice;
  const type = location.state.type;

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
            <div className="trade-price">
              {parseInt(stockPrice).toLocaleString()}원
            </div>
            <div className="trade-current-price">
              {" "}
              <Image src={LightningIcon} className="lightning-icon" />
              122,286원
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
            <Form.Check type={"checkbox"} className="trade-market-price-btn" />

            <div className="trade-market-price-sentence">시장가</div>
          </div>
          <input
            className="trade-stock-input"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="trade-possible">{type}가능 871원</div>
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
        ></PrimaryButton>
      </Container>
    </>
  );
}
