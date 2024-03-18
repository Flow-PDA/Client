import { Container } from "react-bootstrap";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import InterestButton from "../../components/common/button/InterestButton";

const InterestPage = () => {
  return (
    <Container>
      <TopNavigationBar text={"종목 찜 목록"} />
      <InterestButton text1="승인중" text2="승인완료" />
    </Container>
  );
};

export default InterestPage;
