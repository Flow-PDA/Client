import React, { useState } from "react";
import "./SetPricePage.css";
import { Button, Col, Row, Container } from "react-bootstrap";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../../components/common/button/PrimaryButton";

export default function SetPricePage() {
  const navigate = useNavigate();
  const partyKey = useParams().partyKey;
  const [price, setPrice] = useState("");
  const { state } = useLocation();
  const props = { state, price };

  const priceCreate = () => {
    if (!price) {
      alert("목표 금액을 입력하세요.");
    } else {
      navigate(`/party/${partyKey}/info/setdate`, { state: props });
    }
  };
  return (
    <>
      <TopNavigationBar></TopNavigationBar>
      <Container className="setprice-container">
        <Row className="setprice-top">
          <div className="setprice-title">목표금액은 얼마인가요?</div>
          <p className="setprice-detail">
            함께 모여 소중한 순간을 나누고,
            <br />
            목표를 향해 함께 나아가기 위해 어떤 목표를 설정해볼까요?
          </p>
          <input
            type="number"
            placeholder="목표 금액"
            className="setprice-input"
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            value={price}
          />
        </Row>
        <Row className="setprice-bottom">
          <PrimaryButton
            text="다음"
            minWidth="100%"
            onClick={priceCreate}
          ></PrimaryButton>
        </Row>
      </Container>
    </>
  );
}
