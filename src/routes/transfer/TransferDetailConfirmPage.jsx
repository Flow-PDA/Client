import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./TransferDetailConfirmPage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";

export default function TransferDetailConfirmPage() {
  return (
    <>
      <TopNavigationBar />
      <Container className="transfer-detail-page">
        <div className="transfer-confirm-sentence">
          <div className="transfer-account-name">
            <span class="blue-text">김민우</span>님에게
          </div>
          <div className="transfer-price-ask">
            <span class="blue-text">277,869</span>원을
          </div>
          <div className="transfer-ask">옮길까요?</div>
        </div>

        <Row className="transfer-detail-info" style={{ marginTop: "auto" }}>
          <Col className="transfer-detail-title">받는 분에게 표시</Col>
          <Col className="transfer-detail-content">177의 모임통장</Col>
        </Row>
        <Row className="transfer-detail-info">
          <Col className="transfer-detail-title">출금 계좌</Col>
          <Col className="transfer-detail-content">모임통장계좌번호</Col>
        </Row>
        <Row className="transfer-detail-info">
          <Col className="transfer-detail-title">입금 계좌</Col>
          <Col className="transfer-detail-content">사용자 인풋</Col>
        </Row>

        <PrimaryButton
          text="이체하기"
          minWidth="100%"
          style={{ marginTop: "2vh" }}
        />
      </Container>
    </>
  );
}
