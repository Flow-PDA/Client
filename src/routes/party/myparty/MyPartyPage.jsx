import React, { useState } from "react";
import "./MyPartyPage.css";
import Back from "../../../assets/arrow.png";
import Bottom from "../../../assets/bottom_arrow.png";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Row, Container } from "react-bootstrap";
export default function MyPartyPage() {
  const partyKey = useParams().partyKey;
  const [stocks, setStocks] = useState([
    {
      id: 1,
      name: "삼성전자",
      quantity: "15주",
      price: "1,000,000원",
      change: "+150,000원(11%)",
      code: "005930",
    },
    {
      id: 2,
      name: "LG전자",
      quantity: "10주",
      price: "1,000,000원",
      change: "+150,000원(11%)",
      code: "066570",
    },
    {
      id: 3,
      name: "카카오",
      quantity: "5주",
      price: "1,000,000원",
      change: "+150,000원(11%)",
      code: "035720",
    },
  ]);

  // 더보기 버튼 클릭 시 모든 주식 정보 표시
  const handleShowAllStocks = () => {
    // 상태 업데이트
    setStocks([
      ...stocks,
      {
        id: 4,
        name: "현대차",
        quantity: "5주",
        price: "1,000,000원",
        change: "+150,000원(11%)",
        code: "005380",
      },
      {
        id: 5,
        name: "기아",
        quantity: "5주",
        price: "1,000,000원",
        change: "+150,000원(11%)",
        code: "000270",
      },
      {
        id: 4,
        name: "툴젠",
        quantity: "5주",
        price: "1,000,000원",
        change: "+150,000원(11%)",
        code: "199800",
      },
      {
        id: 5,
        name: "에이프로젠",
        quantity: "5주",
        price: "1,000,000원",
        change: "+150,000원(11%)",
        code: "007460",
      },
      {
        id: 6,
        name: "씨씨에스",
        quantity: "5주",
        price: "1,000,000원",
        change: "+150,000원(11%)",
        code: "066790",
      },
    ]);
  };
  return (
    <>
      <TopNavigationBar text="177의 모임투자" type={2} partyKey={partyKey}></TopNavigationBar>
      <Container className="myparty-container">
        <Row className="myparty-deposit-container">
          <div className="myparty-deposit-detail-container">
            <p style={{ margin: "0" }}>973-021-038-01-014</p>
            <h2 style={{ padding: "0" }}>5,982,553원</h2>
            <p>+670,000원(9%)</p>
          </div>
          <div className="myparty-deposit-btn-container">
            <Link to={`/livestock/${partyKey}`}>
              <Button
                variant="primary"
                style={{ width: "25vw", height: "10vw" }}
              >
                투자하기
              </Button>
            </Link>

            <Link to={"/transfer"}>
              <Button
                variant="primary"
                style={{ width: "25vw", height: "10vw" }}
              >
                이체하기
              </Button>
            </Link>
          </div>
          <hr style={{ marginTop: "1.5rem", width: "90vw" }} />
        </Row>
        <Row className="myparty-stock-container">
          {stocks.map((stock) => (
            <Row key={stock.id} className="myparty-stock">
              <Col xs={2}>
                <img
                  className="stock-img"
                  src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stock.code}.png`}
                  alt="stock"
                />
              </Col>
              <Col xs={4}>
                <div>
                  <div>{stock.name}</div>
                  <div>{stock.quantity}</div>
                </div>
              </Col>
              <Col className="myparty-stock-price-container" xs={6}>
                <div>{stock.price}</div>
                <div>{stock.change}</div>
              </Col>
            </Row>
          ))}
        </Row>
        {/* 더보기 버튼 */}
        {stocks.length <= 3 && (
          <button
            onClick={handleShowAllStocks}
            style={{ border: "none", backgroundColor: "#fff" }}
          >
            <img src={Bottom} alt="arrow" />
          </button>
        )}
        <hr style={{ marginTop: "1.5rem", width: "90vw" }} />
        <Row className="myparty-transfer-container">
          <div>거래내역</div>
          <img
            src={Back}
            alt="back"
            style={{ width: "2rem", height: "1rem" }}
          />
        </Row>
      </Container>
    </>
  );
}
