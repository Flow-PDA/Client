import React from "react";
import "./SetDataPage.css";
import { Link } from "react-router-dom";
import Calendar from "../../../components/common/datepicker/Calendar";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Button, Col, Row, Container } from "react-bootstrap";
export default function SetDatePage() {
  return (
    <>
      <TopNavigationBar></TopNavigationBar>
      <Container className="setdate-container">
        <Row className="setdate-top">
          <div className="setdate-title">목표기간을 설정해볼까요?</div>
          <p className="setdate-detail">
            함께 모여 소중한 순간을 나누고,
            <br />
            목표를 향해 함께 나아가기 위해 어떤 목표를 설정해볼까요?
          </p>
          <Calendar></Calendar>
        </Row>
        <Row className="setdate-bottom">
          <Link to={"/party/info"}>
            <PrimaryButton text="완료" minWidth="100%"></PrimaryButton>
          </Link>
        </Row>
      </Container>
    </>
  );
}
