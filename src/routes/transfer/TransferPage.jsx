import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import "./TransferPage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";

export default function TransferPage() {
  return (
    <Container>
      <TopNavigationBar text={"이체하기"} />
      <div className="transfer-possible-price-sentence">이체 가능 금액</div>
      <div className="transfer-possible-price">
        {(4182553).toLocaleString()}원
      </div>
      <PrimaryButton text="이체하기" minWidth="100%" />
      <hr />
      <div className="full-transfer-sentence">전체 내역</div>
      <Row>
        <Col className="transfer-date">3.18</Col>
        <Col className="transfer-name">정찬진</Col>
        <Col className="transfer-price">{(200000).toLocaleString()}원</Col>
      </Row>
      <Row>
        <Col className="transfer-second-line transfer-deposit">
          {(4182553).toLocaleString()}원
        </Col>
      </Row>
      <Row>
        <Col className="transfer-date">3.1</Col>
        <Col className="transfer-name">정찬진</Col>
        <Col className="transfer-price">{(200000).toLocaleString()}원</Col>
      </Row>
      <Row>
        <Col className="transfer-second-line transfer-deposit">
          {(4182553).toLocaleString()}원
        </Col>
      </Row>
    </Container>
  );
}
