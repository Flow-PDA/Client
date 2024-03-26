import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import "./PartyPage.css";
import { modifyTest } from "../../lib/apis/userApi";
import { AuthContext } from "../../lib/contexts/AuthContext";
import { fetchPartyInquire } from "../../lib/apis/party";
// 특정 모임 정보 api
// 잔고 api

export default function PartyPage() {
  const [deposit, setDeposit] = useState([]);
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
      const res = await fetchPartyInquire();
      setParties(res);
      console.log(res);
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
  }, []);
  return (
    <>
      <TopNavigationBar text="모임 생성"></TopNavigationBar>
      <Container className="page-container">
        <button onClick={test}>test</button>
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
          {parties.map((party) => (
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
                <h3>+170,000원(20%)</h3>
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
                <Link to={`/transfer?${party.partyKey}`}>
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
