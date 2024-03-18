import React, { useState } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PartyPage.css";
// 특정 모임 정보 api
// 잔고 api

export default function PartyPage() {
  const [deposit, setDeposit] = useState([]);

  return (
    <Container className="page-container">
      <div className="party-container">
        <div className="alert-container">
          <img src="../../../public/alert.png" alt="alert" />
          <div className="message-container">
            <p className="alert-message main-font">177의 초대</p>
            <p className="alert-message sub-font">정찬진님이 초대했습니다.</p>
          </div>
          <div className="alert-button-container">
            <Button variant="primary">Y</Button>
            <Button variant="danger">N</Button>
          </div>
        </div>
        <div className="deposit-container">
          <div className="deposit-info-container">
            <h2 style={{ textAlign: "left" }}>
              <span style={{ fontWeight: "700" }}>프디아</span>의 모임 투자
            </h2>
            <h2>982,511111153원</h2>
            <h6>+170,000원(20%)</h6>
          </div>
          <div className="deposit-button-container">
            <Button variant="primary">투자</Button>
            <Button variant="primary">이체</Button>
          </div>
        </div>
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
  );
}
