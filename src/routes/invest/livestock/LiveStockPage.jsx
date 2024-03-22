import React, { useState, useEffect } from "react";
import fetchData from "./crawlData";
import "./LiveStockPage.css";
import axios from "axios";
import Swipe from "../../../components/common/swiper/Swiper";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Row, Col, Container } from "react-bootstrap";
import { interval } from "date-fns";

export default function LiveStockPage() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [kospiDatas, setKospiDatas] = useState([]);
  const [kosdaqDatas, setKosdaqDatas] = useState([]);
  const [nasdaqDatas, setNasdaqDatas] = useState([]);
  const [issueDatas, setIssueDatas] = useState([]);

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
  ]);

  const handleClick = (tag) => {
    setSelectedIndex(tag);
    fetchIssueData(tag);
  };
  const priceData = (tag) => {
    fetchIssueData(tag)

  }
  const fetchKospiData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/points/kospi"
      );
      setKospiDatas(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchKosdaqData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/points/kosdaq"
      );
      setKosdaqDatas(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchNasdaqData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/points/nasdaq"
      );
      setNasdaqDatas(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchIssueData = async (tag) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/stocks/hotIssue?tag=${tag}`,
        { tag: tag }
      );
      console.log(response.data);
      setIssueDatas(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  // fetchIssueData(1);

  useEffect(() => {
    fetchKospiData();
    fetchKosdaqData();
    fetchNasdaqData();
  }, []); // 빈 배열을 넘겨주어 한 번만 실행되도록 설정
  useEffect(() => {
    fetchIssueData(1);
  }, []);
  return (
    <>
      <TopNavigationBar></TopNavigationBar>
      <Container className="live-container">
        <Row className="live-banner-container">
          <Swipe></Swipe>
        </Row>
        <hr />
        <Row className="live-point-banner">
          <h3>주요지수</h3>
          <div className="live-all-point-container">
            <div className="live-point-container">
              <h4>코스피</h4>
              <div
                className={kospiDatas.value === "+" ? "red-text" : "blue-text"}
                style={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                {kospiDatas.kospi_point}
              </div>
              <div
                className={kospiDatas.value === "+" ? "red-text" : "blue-text"}
              >
                {kospiDatas.change}
              </div>
            </div>
            <div className="live-point-container">
              <h4>코스닥</h4>
              <div
                className={kosdaqDatas.value === "+" ? "red-text" : "blue-text"}
                style={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                {kosdaqDatas.kosdaq_point}
              </div>
              <div
                className={kosdaqDatas.value === "+" ? "red-text" : "blue-text"}
              >
                {kosdaqDatas.change}
              </div>
            </div>
            <div className="live-point-container">
              <h4>나스닥</h4>
              <div
                className={nasdaqDatas.value === "+" ? "red-text" : "blue-text"}
                style={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                {nasdaqDatas.nasdaq_point}
              </div>
              <div
                className={nasdaqDatas.value === "+" ? "red-text" : "blue-text"}
              >
                {nasdaqDatas.change}
              </div>
            </div>
          </div>
        </Row>
        <hr />
        <Row className="live-hotissue-container">
          <h3>실시간</h3>
          <div className="live-hotissue-btn-container">
            <button
              className={`live-issue-btn ${
                selectedIndex === 1 ? "selected" : ""
              }`}
              onClick={() => handleClick(1)}
            >
              거래량
            </button>
            <button
              className={`live-issue-btn ${
                selectedIndex === 2 ? "selected" : ""
              }`}
              onClick={() => handleClick(2)}
            >
              주가상승률
            </button>
            <button
              className={`live-issue-btn ${
                selectedIndex === 3 ? "selected" : ""
              }`}
              onClick={() => handleClick(3)}
            >
              외국인순매수
            </button>
            <button
              className={`live-issue-btn ${
                selectedIndex === 4 ? "selected" : ""
              }`}
              onClick={() => handleClick(4)}
            >
              기관순매수
            </button>
          </div>
          {issueDatas.map((issueData) => (
            <Row className="myparty-stock">
              <Col xs={2}>
                <img
                  className="stock-img"
                  src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${issueData.stock_code}.png`}
                  alt="image"
                />
              </Col>
              <Col xs={4}>
                <div>
                  <div>{issueData.stbd_nm}</div>
                  {/* <div>{stock.quantity}</div> */}
                </div>
              </Col>
            </Row>
          ))}
          {issueDatas &&
            issueDatas.map((data) => {
              <div>{data.stock_code}</div>;
            })}
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
      </Container>
    </>
  );
}
