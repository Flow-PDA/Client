import React, { useState, useEffect, Suspense } from "react";
import "./LiveStockPage.css";
import axios from "axios";
import Swipe from "../../../components/common/swiper/Swiper";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Row, Col, Container } from "react-bootstrap";
import { interval } from "date-fns";
import { SyncLoader } from "react-spinners";
import { Sync } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import Search from "../../../assets/search.png";
export default function LiveStockPage() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [kospiDatas, setKospiDatas] = useState([]);
  const [kosdaqDatas, setKosdaqDatas] = useState([]);
  const [nasdaqDatas, setNasdaqDatas] = useState([]);
  const [issueDatas, setIssueDatas] = useState([]);
  const [stockDatas, setStockDatas] = useState([]);
  const partyKey = useParams().partyKey;

  const handleClick = (tag) => {
    console.log(tag);
    setSelectedIndex(tag);
    fetchIssueData(tag);
  };

  const priceData = (tag) => {
    fetchIssueData(tag);
  };

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
      console.log(response.data[0]);
      setNasdaqDatas(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchIssueData = async (tag) => {
    try {
      console.log(tag);
      const response = await axios
        .get(`http://localhost:3000/api/stocks/hotIssue?tag=${tag}`, {
          tag: tag,
        })
        .then((response) => {
          console.log(tag);
          const data = response.data;
          setIssueDatas(data);
          Promise.all(
            data.map(async (d) => {
              let items = [];
              return await axios
                .get(
                  `http://localhost:3000/api/stocks/inquired?stock_code=${d.stock_code}`
                )
                .then((stock_res) => {
                  const tmp_data = {
                    rank: d.rank,
                    stbd_nm: d.stbd_nm,
                    stock_code: d.stock_code,
                    prdy_vrss: stock_res.data.prdy_vrss,
                    prdy_vrss_sign: stock_res.data.prdy_vrss_sign,
                    prdy_ctrt: stock_res.data.prdy_ctrt,
                    stck_prpr: stock_res.data.stck_prpr,
                  };
                  console.log(tmp_data);
                  // const items = [...stockDatas];
                  items.push(tmp_data);
                  console.log(items);
                  return items;
                });
            })
          ).then((items) => {
            console.log(items);
            setStockDatas(items);
          });
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchKospiData();
    fetchKosdaqData();
    fetchNasdaqData();
    fetchIssueData(1);
  }, []); // 빈 배열을 넘겨주어 한 번만 실행되도록 설정
  return (
    <div style={{ position: "relative" }}>
      <TopNavigationBar></TopNavigationBar>
      <Link to={`/livestock/${partyKey}/search`}>
        <img
          src={Search}
          alt="search"
          style={{ position: "absolute", top: "1.3rem", right: "1rem" }}
        />
      </Link>

      <Container className="live-container">
        <Row className="live-banner-container">
          <Swipe></Swipe>
        </Row>
        <hr />
        <Row className="live-point-banner">
          <h3>주요지수</h3>
          <div className="live-all-point-container">
            <div className="live-point-container">
              <Suspense fallback={<SyncLoader />}>
                <h4>코스피</h4>
                <div
                  className={
                    kospiDatas.value === "+" ? "red-text" : "blue-text"
                  }
                  style={{ fontSize: "1.5rem", fontWeight: "600" }}
                >
                  {kospiDatas.kospi_point}
                </div>
                <div
                  className={
                    kospiDatas.value === "+" ? "red-text" : "blue-text"
                  }
                >
                  {kospiDatas.change}
                </div>
              </Suspense>
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

          {stockDatas &&
            stockDatas.map((elem) => {
              const stock = elem[0];
              return (
                <Row key={stock.stock_code} className="myparty-stock">
                  <Col xs={2}>
                    <img
                      className="stock-img"
                      src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stock.stock_code}.png`}
                      alt="stock"
                    />
                  </Col>
                  <Col xs={6}>
                    <div>
                      <div className="live-stock-name">{stock.stbd_nm}</div>
                    </div>
                  </Col>
                  <Col className="myparty-stock-price-container" xs={4}>
                    <div>{Number(stock.stck_prpr).toLocaleString()}원</div>
                    <div
                      className={
                        stock.prdy_vrss_sign === "1"
                          ? "red-text"
                          : stock.prdy_vrss_sign === "2"
                          ? "red-text"
                          : "blue-text"
                      }
                    >
                      {Number(stock.prdy_vrss).toLocaleString()}(
                      {stock.prdy_ctrt}%)
                    </div>
                  </Col>
                </Row>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}
