import React from "react";
import "./PartyCreatePage.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";

export default function PartyCreatePage() {
  return (
    <>
      <TopNavigationBar></TopNavigationBar>
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
            <input className="party-input" type="text" />
            <p style={{ margin: "0", color: "#92969B" }}>*계좌번호</p>
            <input className="party-input" type="text" />
          </Col>
          <Col md className="party-btn">
            <Button style={{ width: "90vw" }} variant="primary">
              생성하기
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
