import React, { useState } from "react";
import "./PartyCreatePage.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchPartyCreate } from "../../../lib/apis/party";
import { Container, Row, Col, Button } from "react-bootstrap";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";

export default function PartyCreatePage() {
  const [partyName, setPartyName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const navigate = useNavigate();

  const CreateParty = async () => {
    if (!partyName || !accountNumber) {
      alert("모임명과 계좌번호를 입력해주세요.");
    } else {
      const response = await fetchPartyCreate(partyName, accountNumber);
      navigate("/party");
    }
  };

  return (
    <>
      <TopNavigationBar />
      <Container className="party-create-container">
        <Row className="party-notice">
          <Col>
            <div>
              모임 생성을 위해
              <br />
              정보를 입력해주세요.
            </div>
          </Col>
        </Row>
        <Row className="party-form">
          <Col md className="party-info">
            <p style={{ margin: "0", color: "#92969B" }}>*모임명</p>
            <input
              className="party-input"
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
            />
            <p style={{ margin: "0", color: "#92969B" }}>*계좌번호</p>
            <input
              className="party-input"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </Col>
          <Col md className="party-btn">
            <PrimaryButton
              text="생성하기"
              onClick={CreateParty}
              minWidth="100%"
            ></PrimaryButton>
          </Col>
        </Row>
      </Container>
    </>
  );
}
