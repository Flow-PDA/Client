import logo from "../assets/logo.svg";
import "./MainPage.css";
import PrimaryButton from "../components/common/button/PrimaryButton";
const MainPage = () => {
  return (
    <div>
      <div>
        <img src={logo} alt="Logo" />
        <h2>함께하는 투자</h2>
        <div>FLOW와 함께라면 쉬워요</div>
        <div>지금 모임을 만들고 투자를 시작해보세요!</div>
      </div>
      <div className="accountLink">
        <PrimaryButton text="시작하기" minWidth="100%" />
        <span>이미 계정이 있나요? </span>
        <span className="loginButton">로그인</span>
      </div>
    </div>
  );
};

export default MainPage;
