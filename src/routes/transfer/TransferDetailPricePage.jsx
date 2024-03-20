import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./TransferDetailPricePage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import { Link } from "react-router-dom";

export default function TransferDetailPricePage() {
  return (
    <>
      <TopNavigationBar />
      <Container className="transfer-detail-page">
        <div className="transfer-how-sentence">얼마나 옮길까요?</div>
        <div className="account-info">
          <div className="account-name">김민우</div>
          <div className="account-number">신한투자증권 270-71-123456으로</div>
        </div>

        <Row className="transfer-form">
          <Col className="transfer-info">
            <p style={{ margin: "0", color: "#92969B", fontSize: "0.9rem" }}>
              * 금액
            </p>
            <input className="transfer-input" type="text" />
          </Col>
        </Row>

        <div>
          <div className="transfer-possible-deposit">
            이체 가능 금액: 279,866원
          </div>
        </div>
        <Link
          to={`/transfer/transferDetailConfirmPage`}
          preventScrollReset
          className="text-decoration-none"
        >
          <PrimaryButton
            style={{ marginTop: "auto" }}
            text="다음"
            minWidth="100%"
          />
        </Link>
      </Container>
    </>
  );
}
