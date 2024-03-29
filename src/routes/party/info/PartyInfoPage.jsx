import React, { useState, useEffect } from "react";
import "./PartyInfoPage.css";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  fetchPartyInfo,
  fetchPartyAdmin,
  fetchPartyMemberInquire,
  fetchSearchUser,
  fetchDeleteUser,
} from "../../../lib/apis/party";
import Next from "../../../assets/arrow.png";
import Bottom from "../../../assets/bottom_arrow.png";
import Up from "../../../assets/up_arrow.png";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import party from "../../../lib/apis/party";

export default function PartyInfoPage() {
  const partyKey = useParams().partyKey;
  const [info, setInfo] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [member, setMember] = useState([]);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);

  const showUser = () => {
    setUsers((prevUsers) => (prevUsers.length === 0 ? members : []));
  };
  const deleteUser = async (userKey) => {
    try {
      const response = await fetchDeleteUser(partyKey, userKey);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  // 모임 정보 조회
  const fetchData = async () => {
    const response = await fetchPartyInfo(partyKey);
    console.log(response);
    setInfo(response);
  };

  // 현재 접속 중인 유저의 권한
  const fetchAdmin = async () => {
    try {
      const response = await fetchPartyAdmin(partyKey);
      console.log(response.data);
      setAdmin(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 모임의 속한 인원 전부 조회
  const fetchMember = async () => {
    try {
      const response = await fetchPartyMemberInquire(partyKey);
      console.log(response.data.result[0]);
      setMember(response.data.result);
      const temps = response.data.result;
      temps.map(async (temp) => {
        const resp = await fetchSearchUser(partyKey, temp.userKey);
        members.push(resp.data);
        console.log(members);
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 3자리 단위로 숫자 끊기
  const addCommasToNumber = (number) => {
    // 숫자가 아닌 값이 들어온 경우 빈 문자열 반환
    if (typeof number !== "number") return "";

    const numberString = number.toString();
    const parts = numberString.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  useEffect(() => {
    fetchData();
    fetchAdmin();
    fetchMember();
  }, []);

  return (
    <>
      <TopNavigationBar></TopNavigationBar>
      <Container className="info-container">
        <Row className="info-top-container">
          <div className="info-title">{info.name}의 모임투자</div>
          <div className="info-detail">
            <div>
              <div>모임 시작일</div>
              <div>목표</div>
              <div>목표 금액</div>
              <div>목표 날짜</div>
            </div>
            <div>
              <div>
                {!info.createdAt ? info.createdAt : info.createdAt.slice(0, 10)}
              </div>
              <div>{info.goal}</div>
              <div>{addCommasToNumber(info.goalPrice)}원</div>
              <div>{info.goalDate}</div>
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
              members.map((mem) => (
                <div key={mem.userKey} className="info-member">
                  <div>{mem.userName}</div>
                  <Button
                    className="text-center"
                    variant="danger"
                    onClick={() => {
                      console.log(mem.userKey);
                      deleteUser(mem.userKey);
                    }}
                    style={{
                      height: "2.4rem",
                      backgroundColor: "#F46060",
                      marginRight: "1rem",
                      textAlign: "center",
                    }}
                    disabled={admin.role === 0} // 버튼 비활성화 조건 추가
                  >
                    내보내기
                  </Button>
                </div>
              ))}
          </Col>
          <Col>
            <div className="info-btn-container">
              <div className="info-link">친구 초대</div>
              <Link to={`/party/${partyKey}/info/invite`}>
                <button style={{ border: "none", backgroundColor: "#fff" }}>
                  <img src={Next} alt="arrow" />
                </button>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="info-btn-container">
              <div className="info-link">목표 설정</div>
              <Link to={`/party/${partyKey}/info/setgoal`}>
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
