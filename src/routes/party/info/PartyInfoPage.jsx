import React, { useState } from "react";
import "./PartyInfoPage.css";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Next from "../../../assets/arrow.png";
import Bottom from "../../../assets/bottom_arrow.png";
import Up from "../../../assets/up_arrow.png";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
export default function PartyInfoPage() {
  const [info, setInfo] = useState({
    created_at: "2024-03-09",
    goal: "여행",
    goal_price: 1000000,
    goal_date: "2025-06-29",
  });
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "김민우",
    },
    {
      id: 2,
      name: "이선영",
    },
    {
      id: 3,
      name: "정찬진",
    },
    {
      id: 4,
      name: "한다현",
    },
  ]);
  const [users, setUsers] = useState([]);
  const showUser = () => {
    setUsers((prevUsers) => (prevUsers.length === 0 ? members : []));
  };
  return (
    <>
      <TopNavigationBar></TopNavigationBar>
      <Container className="info-container">
        <Row className="info-top-container">
          <div className="info-title">177의 모임투자</div>
          <div className="info-detail">
            <div>
              <div>모임 시작일</div>
              <div>목표</div>
              <div>목표 금액</div>
              <div>목표 날짜</div>
            </div>
            <div>
              <div>{info.created_at}</div>
              <div>{info.goal}</div>
              <div>{info.goal_price}</div>
              <div>{info.goal_date}</div>
            </div>
          </div>
        </Row>
        <Row className="info-bottom-container">
          <div style={{ backgroundColor: "#F5F5F5" }}>모임 설정</div>
          <Col>
            <div className="info-btn-container">
              <div className="info-link">모임 멤버</div>
              <button
                style={{
                  border: "none",
                  backgroundColor: "#fff",
                }}
                onClick={showUser}
              >
                <img
                  src={users.length > 1 ? Up : Bottom}
                  alt="arrow"
                  style={{ width: "1rem", height: "0.5rem", fontWeight: "800" }}
                />
              </button>
            </div>
          </Col>
          <Col className="info-member-container">
            {users.length > 1 &&
              members.map((member) => (
                <div key={member.key} className="info-member">
                  <div>{member.name}</div>
                  <Button
                    className="text-center"
                    variant="danger"
                    style={{
                      height: "2.4rem",
                      backgroundColor: "#F46060",
                      marginRight: "1rem",
                      textAlign: "center",
                    }}
                  >
                    내보내기
                  </Button>
                </div>
              ))}
          </Col>
          <Col>
            <div className="info-btn-container">
              <div className="info-link">친구 초대</div>
              <Link to={"/party/info/invite"}>
                <button style={{ border: "none", backgroundColor: "#fff" }}>
                  <img src={Next} alt="arrow" />
                </button>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="info-btn-container">
              <div className="info-link">목표 설정</div>
              <Link to={"/party/info/setgoal"}>
                <button style={{ border: "none", backgroundColor: "#fff" }}>
                  <img src={Next} alt="arrow" />
                </button>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="info-btn-container">
              <div className="info-link">모임 투자 사용 종료</div>
              <button style={{ border: "none", backgroundColor: "#fff" }}>
                <img src={Next} alt="arrow" />
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
