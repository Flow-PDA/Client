import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import InterestButton from "../../components/common/button/InterestButton";
import "./InterestPage.css";
import InterestPending from "./InterestPending";
import { useEffect, useState } from "react";
// import InterestApproval from "./InterestApproval";
import { useParams } from "react-router-dom";
import InterestApproval from "./InterestApproval";

export default function InterestPage() {
  const [activeButton, setActiveButton] = useState(0); // 초기값은 0으로 설정
  const partyKey = useParams().partyKey;

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <>
      <TopNavigationBar text={"종목 찜 목록"} type={1} />
      <Container>
        <InterestButton
          className="interest-state-button"
          text1="승인중"
          text2="승인완료"
          activeButton={activeButton} // 현재 활성화된 버튼 상태를 전달
          onClick={handleButtonClick} // 버튼 클릭 이벤트 핸들러를 전달
        />
        {activeButton === 0 ? (
          <InterestPending partyKey={partyKey} />
        ) : (
          <InterestApproval partyKey={partyKey} />
        )}
      </Container>
    </>
  );
}
