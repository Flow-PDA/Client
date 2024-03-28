import React, { useState, useEffect } from "react";
import "./MyPartyPage.css";
import Back from "../../../assets/arrow.png";
import Bottom from "../../../assets/bottom_arrow.png";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchPartyInfo } from "../../../lib/apis/party";
import { fetchDepositData, fetchHavingStock } from "../../../lib/apis/stock";
import { Button, Col, Row, Container } from "react-bootstrap";

export default function MyPartyPage() {
  const navigate = useNavigate();
  const partyKey = useParams().partyKey;
  const [infos, setInfos] = useState([]);
  const [parties, setParties] = useState([]);
  const [havings, setHavings] = useState([]);
  const [showAllStocks, setShowAllStocks] = useState(false); // 추가

  const fetchData = async () => {
    try {
      const temps = await fetchPartyInfo(partyKey);
      setParties(temps);
      const CANO = temps.accountNumber;
      const APPKEY = temps.appKey;
      const APPSECRET = temps.appSecret;
      const TOKEN = temps.token;
      const new_tmp = await fetchDepositData(CANO, APPKEY, APPSECRET, TOKEN);
      setInfos(new_tmp);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStock = async () => {
    try {
      const response = await fetchHavingStock(partyKey);
      setHavings(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStock();
  }, []);

  const handleShowAllStocks = () => {
    setShowAllStocks(true);
  };

  return (
    <>
      <TopNavigationBar
        text={`${parties.name}의 모임투자`}
        type={2}
        partyKey={partyKey}
      />
      <Container className="myparty-container">
        <Row className="myparty-deposit-container">
          <div className="myparty-deposit-detail-container">
            <p style={{ margin: "0" }}>{parties.accountNumber}</p>
            <h2 style={{ padding: "0" }}>
              {(
                parties.deposit + Number(infos.evlu_amt_smtl_amt)
              ).toLocaleString()}
              원
            </h2>
            <h3
              className={
                infos.evlu_amt_smtl_amt - infos.pchs_amt_smtl_amt >= 0
                  ? "red-txt"
                  : "blue-txt"
              }
            >
              {Number(infos.evlu_amt_smtl_amt) !== 0 &&
              Number(infos.pchs_amt_smtl_amt) !== 0 ? (
                <>
                  {(
                    infos.evlu_amt_smtl_amt - infos.pchs_amt_smtl_amt
                  ).toLocaleString()}
                  원 (
                  {(
                    ((infos.evlu_amt_smtl_amt - infos.pchs_amt_smtl_amt) /
                      infos.pchs_amt_smtl_amt) *
                    100
                  ).toFixed(2)}
                  %)
                </>
              ) : (
                <>0(0%)</>
              )}
            </h3>
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
            <Link to={`/transfer/${partyKey}`}>
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
          {havings.slice(0, showAllStocks ? havings.length : 3).map((stock) => (
            <Row
              key={stock.pdno}
              className="myparty-stock"
              onClick={() =>
                navigate(`/stockDetail/${partyKey}/${stock.pdno}/chart`)
              }
            >
              <Col xs={2}>
                <img
                  className="stock-img"
                  src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stock.pdno}.png`}
                  alt="stock"
                />
              </Col>
              <Col xs={4}>
                <div>
                  <div style={{ fontSize: "0.9rem" }}>{stock.prdt_name}</div>
                  <div>{stock.hldg_qty}주</div>
                </div>
              </Col>
              <Col className="myparty-stock-price-container" xs={6}>
                <div>{Number(stock.evlu_amt).toLocaleString()}원</div>
                <div
                  className={
                    stock.evlu_erng_rt[0] === "-" ? "blue-text" : "red-text"
                  }
                >
                  {Number(stock.evlu_pfls_amt).toLocaleString()}원(
                  {stock.evlu_pfls_rt}%)
                </div>
              </Col>
            </Row>
          ))}
        </Row>
        {/* 더보기 버튼 */}
        {havings.length > 3 && !showAllStocks && (
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
            onClick={() => navigate(`/transfer/${partyKey}?1`)}
            style={{ width: "2rem", height: "1rem" }}
          />
        </Row>
      </Container>
    </>
  );
}
