import React from "react";
import "./SetPricePage.css";
import { Button, Col, Row, Container } from "react-bootstrap";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../components/common/button/PrimaryButton";

export default function SetPricePage() {
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
            type="text"
            placeholder="목표 금액"
            className="setprice-input"
          />
          <div className="setprice-deposit">현재 보유 금액 : 279,666원</div>
        </Row>
        <Row className="setprice-bottom">
          <Link to={"/party/info/setdate"}>
            <PrimaryButton text="다음" minWidth="100%"></PrimaryButton>
          </Link>
        </Row>
      </Container>
    </>
  );
}
