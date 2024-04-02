import React, { useState, useEffect } from "react";
import "./SetDataPage.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CalendarCustomFour from "../../../components/common/datepicker/Calendar";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Button, Col, Row, Container } from "react-bootstrap";
import { fetchPartyGoal } from "../../../lib/apis/party";

export default function SetDatePage() {
  const partyKey = useParams().partyKey;
  const [endDate, setEndDate] = useState(""); // 추가: endDate 상태 추가
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleEndDataChange = (endDate) => {
    setEndDate(endDate);
    // 원하는 동작 수행
  };

  const goal = state.state;
  const goalPrice = state.price;
  const goalDate = endDate; // 수정: endDateFromCalendar 상태로부터 goalDate 값 가져오도록 수정

  const CreateGoal = async () => {
    if (!goalDate) {
      alert("목표 기간을 입력해주세요.");
    } else {
      const response = await fetchPartyGoal(
        partyKey,
        goal,
        goalPrice,
        goalDate
      );
      navigate(`/party/${partyKey}/myparty`);
    }
  };

  return (
    <>
      <TopNavigationBar />
      <Container className="setdate-container">
        <Row className="setdate-top">
          <div className="setdate-title">목표기간을 설정해볼까요?</div>
          <p className="setdate-detail">
            함께 모여 소중한 순간을 나누고,
            <br />
            목표를 향해 함께 나아가기 위해 어떤 목표를 설정해볼까요?
          </p>
          <CalendarCustomFour handleEndDataChange={handleEndDataChange} />
        </Row>
        <Row className="setdate-bottom">
          <PrimaryButton
            text="완료"
            minWidth="100%"
            onClick={CreateGoal}
          ></PrimaryButton>
        </Row>
      </Container>
    </>
  );
}
