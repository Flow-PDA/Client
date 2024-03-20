import { Button, Col, Container, Row } from "react-bootstrap";
import "./InterestPage.css";
import HorizontalLine from "../../components/line/HorizontalLine";
import PrimaryModal from "../../components/common/modal/PrimaryModal";
import { useState } from "react";

const InterestApproval = () => {
  const [showModal, setShowModal] = useState(false); // 모달 상태를 관리합니다.

  const handleShowModal = () => setShowModal(true); // 모달을 열기 위한 함수입니다.
  const handleCloseModal = () => setShowModal(false); // 모달을 닫기 위한 함수입니다.

  const interestStock = [
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
    { date: "3.6", company: "삼성전자", name: "최투자" },
  ];

  return (
    <Container>
      {interestStock.map((data, index) => (
        <Row className="interest-list" key={index}>
          <Col xs={2} className="interest-date">
            {data.date}
          </Col>
          <Col xs={6}>
            <Row className="interest-company">{data.company}</Row>
            <Row className="interest-name">{data.name}</Row>
          </Col>
          <Col xs={4} className="interest-remove-button-col">
            <Button
              className="interest-remove-button"
              onClick={handleShowModal}
            >
              종목뺴기
            </Button>
            <PrimaryModal
              show={showModal}
              handleClose={handleCloseModal}
              contentText={"종목을 제거하시겠습니까?"}
              buttonText={"종목빼기"}
            />{" "}
            {/* 모달 컴포넌트를 렌더링합니다. */}
          </Col>
          <HorizontalLine />
        </Row>
      ))}
    </Container>
  );
};

export default InterestApproval;
