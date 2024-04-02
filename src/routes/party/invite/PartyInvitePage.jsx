import React, { useEffect } from "react";
import "./PartyInvitePage.css";
import Logo from "../../../assets/logo.svg";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import KakaoBtn from "../../../assets/kakao.png";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
const { Kakao } = window;

export default function PartyInvitePage() {
  const partyKey = useParams().partyKey;
  const realUrl = `http://www.pda-flow.site?partyKey=${partyKey}`;
  const resultUrl = window.location.href;
  useEffect(() => {
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    Kakao.init("694e4a50f31054df8556e5f645705327");
    console.log(Kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "같이하는 투자",
        description: "친구와 함께 투자해보세요!",
        imageUrl: "https://avatars.githubusercontent.com/u/162952288?s=200&v=4",
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
      buttons: [
        {
          title: "같이 하는 투자",
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },
      ],
      installTalk: true,
    });
  };
  return (
    <>
      <TopNavigationBar text="새로운 멤버 초대"></TopNavigationBar>
      <Container className="invite-container">
        <div style={{ fontSize: "2rem" }}>카카오톡</div>
        <div className="kakao-container">
          <button
            className="kakao-btn"
            onClick={() => {
              shareKakao();
            }}
          >
            <img
              src={KakaoBtn}
              alt="kakao"
              style={{ position: "absolute", left: "1rem" }}
            />
            <div>카카오로 시작하기</div>
          </button>
          <p className="kakao-p">투자를 함께할 멤버를 초대해보세요</p>
        </div>
      </Container>
    </>
  );
}
