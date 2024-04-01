import React, { useState, useEffect } from "react";
import "./MyPartyPage.css";
import Back from "../../../assets/arrow.png";
import Bottom from "../../../assets/down_arrow.png";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchPartyInfo } from "../../../lib/apis/party";
import { fetchDepositData, fetchHavingStock } from "../../../lib/apis/stock";
import { Button, Col, Row, Container } from "react-bootstrap";
import { SyncLoader } from "react-spinners";

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
        text={parties.name !== undefined ? `${parties.name}의 모임투자` : ""}
        type={2}
        partyKey={partyKey}
        to={"/party"}
      />

      <Container className="myparty-container">
        {infos.length === 0 ? (
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
            <Row className="myparty-deposit-container">
              <div className="myparty-deposit-detail-container">
                <p style={{ margin: "0", fontWeight: 400 }}>
                  [계좌] {parties.accountNumber}
                </p>
                <h1 style={{ padding: "0", fontWeight: 600 }}>
                  {(
                    parties.deposit + Number(infos.evlu_amt_smtl_amt)
                  ).toLocaleString()}
                  원
                </h1>
                <h5
                  style={{ fontWeight: "500" }}
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
                </h5>
              </div>
              <div className="myparty-deposit-btn-container">
                <Link to={`/livestock/${partyKey}`}>
                  <Button
                    style={{
                      width: "24vw",
                      height: "10vw",
                      backgroundColor: "#375AFF",
                      borderColor: "#375AFF",
                    }}
                  >
                    투자하기
                  </Button>
                </Link>
                <Link to={`/transfer/${partyKey}`}>
                  <Button
                    style={{
                      width: "24vw",
                      height: "10vw",
                      backgroundColor: "#375AFF",
                      borderColor: "#375AFF",
                    }}
                  >
                    이체하기
                  </Button>
                </Link>
              </div>
            </Row>
            <hr style={{ marginTop: "1.5rem", width: "90vw" }} />
            <Row className="myparty-stock-container">
              {havings
                .slice(0, showAllStocks ? havings.length : 5)
                .map((stock) => (
                  <Row
                    key={stock.pdno}
                    className="myparty-stock"
                    onClick={() =>
                      navigate(`/stockDetail/${partyKey}/${stock.pdno}/chart`)
                    }
                  >
                    <Col xs={2} style={{ padding: "0.75vw" }}>
                      <img
                        className="stock-img"
                        src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stock.pdno}.png`}
                        alt="stock"
                      />
                    </Col>
                    <Col xs={4} style={{ padding: "0.5vw" }}>
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                          {stock.prdt_name}
                        </div>
                        <div style={{ fontSize: "1.1rem" }}>
                          {stock.hldg_qty}주
                        </div>
                      </div>
                    </Col>
                    <Col
                      className="myparty-stock-price-container"
                      xs={6}
                      style={{ padding: "0.75vw" }}
                    >
                      <div style={{ fontWeight: "500", fontSize: "1.1rem" }}>
                        {Number(stock.evlu_amt).toLocaleString()}원
                      </div>
                      <div
                        className={
                          stock.evlu_erng_rt[0] === "-"
                            ? "blue-text"
                            : "red-text"
                        }
                        style={{ fontWeight: "600", fontSize: "1.1rem" }}
                      >
                        {stock.evlu_erng_rt[0] === "-" ? <></> : <>+</>}
                        {Number(stock.evlu_pfls_amt).toLocaleString()} (
                        {stock.evlu_pfls_rt}%)
                      </div>
                    </Col>
                  </Row>
                ))}
            </Row>
            {/* 더보기 버튼 */}
            {havings.length > 5 && !showAllStocks && (
              <button
                onClick={handleShowAllStocks}
                style={{ border: "none", backgroundColor: "#fff" }}
              >
                <span>더보기</span>
                <img
                  src={Bottom}
                  alt="arrow"
                  style={{ marginLeft: "2vw", width: "3.5vw" }}
                />
              </button>
            )}
          </>
        )}

        <hr style={{ marginTop: "1rem", width: "90vw" }} />
        <div
          className="myparty-transfer-container"
          onClick={() =>
            navigate(`/party/${partyKey}/myPartyTransactionDetail`)
          }
        >
          거래내역
        </div>
      </Container>
    </>
  );
}
