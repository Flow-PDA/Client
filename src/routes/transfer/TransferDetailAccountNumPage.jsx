import React from "react";
import shinhan_CI from "../../assets/shinhan_CI.png";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./TransferDetailAccountNumPage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";

export default function TransferDetailAccountNum() {
  return (
    <>
      <TopNavigationBar />
      <Container className="transfer-detail-page">
        <div className="transfer-how-sentence">어디로 돈을 보낼까요?</div>

        <Row className="transfer-form">
          <Col className="transfer-info">
            <p style={{ margin: "0", color: "#92969B", fontSize: "0.9rem" }}>
              * 이름
            </p>
            <input className="transfer-input" type="text" />
            <p style={{ margin: "0", color: "#92969B", fontSize: "0.9rem" }}>
              * 계좌번호
            </p>
            <input className="transfer-input" type="text" />
          </Col>
        </Row>

        <div className="recent-account-sentence">최근 보낸 계좌</div>
        <div className="recent-account-container">
          <div className="recent-account">
            <div className="recent-account-CI">
              <img src={shinhan_CI} alt="shinhan_CI" width="35vw" />
            </div>
            <div className="recent-account-info">
              <div className="recent-account-name">김민우</div>
              <div className="recent-account-number">
                신한투자증권 270-71-123456
              </div>
            </div>
          </div>
          <div className="recent-account">
            <div className="recent-account-CI">
              <img src={shinhan_CI} alt="shinhan_CI" width="35vw" />
            </div>
            <div className="recent-account-info">
              <div className="recent-account-name">김민우</div>
              <div className="recent-account-number">
                신한투자증권 270-71-123456
              </div>
            </div>
          </div>
        </div>
        <PrimaryButton
          style={{ marginTop: "auto" }}
          text="다음"
          minWidth="100%"
        />
      </Container>
    </>
  );
}
