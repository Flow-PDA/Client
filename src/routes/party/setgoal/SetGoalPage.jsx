import React, { useState } from "react";
import "./SetGoalPage.css";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Col, Row, Container } from "react-bootstrap";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import { Link, useNavigate,useParams } from "react-router-dom";

export default function SetGoalPage() {
  const partyKey = useParams().partyKey
  const navigate = useNavigate();
  const [goal, setGoal] = useState("");
  const goalCreate = () => {
    if (!goal) {
      alert("목표를 입력해주세요.");
    } else {
      navigate(`/party/${partyKey}/info/setprice`, { state: goal });
    }
  };

  return (
    <>
      <TopNavigationBar></TopNavigationBar>
      <Container className="setgoal-container">
        <Row className="setgoal-top">
          <div className="setgoal-title">목표는 무엇인가요?</div>
          <p className="setgoal-detail">
            함께 모여 소중한 순간을 나누고,
            <br />
            목표를 향해 함께 나아가기 위해 어떤 목표를 설정해볼까요?
          </p>
          <input
            type="text"
            placeholder="모임 목적"
            className="setgoal-input"
            onChange={(e) => setGoal(e.target.value)}
            value={goal}
          />
        </Row>
        <Row className="setgoal-bottom">
          <PrimaryButton
            text="다음"
            minWidth="100%"
            onClick={goalCreate}
          ></PrimaryButton>
        </Row>
      </Container>
    </>
  );
}
