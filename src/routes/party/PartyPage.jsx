import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import "./PartyPage.css";
import { modifyTest } from "../../lib/apis/userApi";
import { AuthContext } from "../../lib/contexts/AuthContext";
import { fetchPartyInquire } from "../../lib/apis/party";
import { fetchDepositData } from "../../lib/apis/stock";
// 특정 모임 정보 api
// 잔고 api

export default function PartyPage() {
  const [infos, setInfos] = useState([]);
  const [parties, setParties] = useState([]);
  const { throwAuthError } = useContext(AuthContext);
  const navigate = useNavigate();
  const test = useCallback(async (e) => {
    e.preventDefault();
    try {
      const res = await modifyTest(2);
      console.log(res);
    } catch (error) {
      if (error.response.status === 401) {
        console.log("throws");
        throwAuthError();
      }
    }
  }, []);
  const fetchData = async () => {
    try {
      const temps = await fetchPartyInquire();
      const tmp = [];
      console.log(temps);
      setParties(temps);

      temps.map(async (party) => {
        const CANO = party.accountNumber;
        const TOKEN = party.token;
        const APPSECRET = party.appSecret;
        const APPKEY = party.appKey;
        const res = await fetchDepositData(CANO, APPKEY, APPSECRET, TOKEN);
        const temp = Object.assign({}, party, res);
        tmp.push(temp);
        const new_tmp = tmp.map((elem) => elem);
        console.log(new_tmp);
        setInfos(new_tmp);
      });
    } catch (error) {
      if (error.response.status === 401) {
        console.log("throws");
        throwAuthError();
      }
    }
  };

  const PartyClick = (partyKey) => {
    navigate(`/party/${partyKey}/myparty`);
  };

  const addCommasToNumber = (number) => {
    // 숫자가 아닌 값이 들어온 경우 빈 문자열 반환
    if (typeof number !== "number") return "";

    const numberString = number.toString();
    const parts = numberString.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  useEffect(() => {
    fetchData();
    // fetchDeposit();
  }, []);
  return (
    <>
      <button onClick={test}>test</button>
      <TopNavigationBar text="모임 생성"></TopNavigationBar>
      <Container className="page-container">
        <div className="party-container">
          <div className="alert-container">
            <img src="../../../public/alert.png" alt="alert" />
            <div className="message-container">
              <p className="alert-message main-font">177의 초대</p>
              <p className="alert-message sub-font">정찬진님이 초대했습니다.</p>
            </div>
            <div className="alert-button-container">
              <Button variant="primary" style={{ backgroundColor: "#375AFF" }}>
                Y
              </Button>
              <Button variant="danger">N</Button>
            </div>
          </div>
          {infos.map((party) => (
            <div className="deposit-container" key={party.partyKey}>
              <div
                onClick={() => {
                  PartyClick(party.partyKey);
                }}
                className="deposit-info-container"
              >
                <h3>
                  <span style={{ fontWeight: "700" }}>{party.name}</span>의 모임
                  투자
                </h3>
                <h1 style={{ padding: "0" }}>
                  {addCommasToNumber(party.deposit)}원
                </h1>
                <h3
                  className={
                    party.evlu_amt_smtl_amt - party.pchs_amt_smtl_amt >= 0
                      ? "red-txt"
                      : "blue-txt"
                  }
                >
                  {Number(party.evlu_amt_smtl_amt) !== 0 &&
                  Number(party.pchs_amt_smtl_amt) !== 0 ? (
                    <>
                      {party.evlu_amt_smtl_amt - party.pchs_amt_smtl_amt}원 (
                      {(
                        ((party.evlu_amt_smtl_amt - party.pchs_amt_smtl_amt) /
                          party.pchs_amt_smtl_amt) *
                        100
                      ).toFixed(2)}
                      %)
                    </>
                  ) : (
                    <>0(0%)</>
                  )}
                </h3>
              </div>

              <div className="deposit-button-container">
                <Link to={`/livestock/${party.partyKey}`}>
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "#375AFF" }}
                  >
                    투자
                  </Button>
                </Link>
                <Link to={`/transfer/${party.partyKey}`}>
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "#375AFF" }}
                  >
                    이체
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          <Link to={"/party/create"}>
            <Button
              style={{
                backgroundColor: "#f8f6f6",
                color: "#000",
                fontSize: "2rem",
                border: "none",
                width: "90vw",
              }}
            >
              +
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
