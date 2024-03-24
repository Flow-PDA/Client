import { Container, Image, Nav, Navbar } from "react-bootstrap";
import BackButton from "../../../assets/back.png";
import HamburgerButton from "../../../assets/hamburger.png";
import SettingButton from "../../../assets/settings.png";
import XButton from "../../../assets/x.png";
import HomeButton from "../../../assets/home.png";
import RightArrowButton from "../../../assets/right_arrow.png";
import DownArrowButton from "../../../assets/down_arrow.png";
import InterestButton from "../../../assets/interest.png";
import StockButton from "../../../assets/stock.png";
import TransferButton from "../../../assets/cash.png";
import "./TopNavigationBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TopNavigationBar = ({ text, type = 0 }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleHamburgerButtonClick = () => {
    setMenuOpen(!menuOpen);
    setToggleOpen(false);
  };

  const handleSettingButtonClick = () => {};
  const handleHomeButtonClick = () => {};

  const handletoggleButtonClick = () => {
    setToggleOpen(!toggleOpen);
  };

  if (type === 0) {
    //기본, 뒤로가기와 가운데 텍스트 있음
    return (
      <Navbar className="navbar">
        <Container className="navbar-container">
          <Navbar.Brand
            onClick={handleBackButtonClick}
            className="navbar-brand"
          >
            <Image src={BackButton} alt="Back" />
          </Navbar.Brand>
          <Nav.Item className="nav-item-text">{text}</Nav.Item>
        </Container>
      </Navbar>
    );
  } else if (type === 1) {
    //햄버거 버튼 있는 버전
    return (
      <Navbar className="navbar">
        <Container className="navbar-container">
          <Navbar.Brand
            onClick={handleBackButtonClick}
            className="navbar-brand"
          >
            <Image src={BackButton} alt="Back" />
          </Navbar.Brand>
          <Nav.Item className="nav-item-text">{text}</Nav.Item>

          <Navbar.Brand
            onClick={handleHamburgerButtonClick}
            className="navbar-brand icon-right"
          >
            <Image src={HamburgerButton} alt="Hamburger" />
          </Navbar.Brand>
        </Container>
        {menuOpen && (
          <div className="slide-menu-background active">
            <div className="slide-menu">
              <div className="slide-menu-top">
                <div className="slide-menu-x">
                  <Navbar.Brand
                    onClick={handleHamburgerButtonClick}
                    className="navbar-brand"
                  >
                    <Image src={XButton} className="x-btn" alt="X" />
                  </Navbar.Brand>
                </div>
                <div className="slide-menu-top-info">
                  <div className="home-name">
                    <div className="go-to-home" onClick={handleHomeButtonClick}>
                      <Image src={HomeButton} alt="Home" />
                    </div>
                    <div className="userName">이신한님</div>
                  </div>
                  <div className="logout">로그아웃</div>
                </div>
              </div>
              <div className="party-stock">
                <div className="current-party">현재 모임투자</div>
                <div className="current-party-info">
                  <div className="party-name">177의 모임투자</div>
                  <div className="party-account-number">123-456-789</div>
                  <div className="slide-menu-buttons">
                    <div className="menu-btn">
                      <Image src={TransferButton} />
                      <span> 이체하기</span>
                    </div>
                    <div className="menu-btn">
                      <Image src={StockButton} />
                      <span> 투자하기</span>
                    </div>
                    <div className="menu-btn interest-btn">
                      <Image src={InterestButton} />
                      <span> 관심목록</span>
                    </div>
                  </div>
                </div>
                <div
                  className="move-another-account"
                  onClick={handletoggleButtonClick}
                >
                  다른 모임투자로 이동하기
                  {toggleOpen ? (
                    <>
                      <Image
                        src={DownArrowButton}
                        className="right-arrow-btn"
                      />
                      <div className="another-party">
                        <div className="another-party-info">
                          <div className="party-name">178의 모임투자</div>
                          <div className="party-account-number">
                            012-456-789
                          </div>
                        </div>
                        <div className="another-party-info">
                          <div className="party-name">179의 모임투자</div>
                          <div className="party-account-number">
                            012-422-789
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image src={RightArrowButton} className="right-arrow-btn" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Navbar>
    );
  } else if (type === 2) {
    //설정 버튼 있는 버전
    return (
      <Navbar className="navbar">
        <Container className="navbar-container">
          <Navbar.Brand
            onClick={handleBackButtonClick}
            className="navbar-brand"
          >
            <Image src={BackButton} alt="Back" />
          </Navbar.Brand>
          <Nav.Item className="nav-item-text">{text}</Nav.Item>
          <Navbar.Brand
            onClick={handleSettingButtonClick}
            className="navbar-brand icon-right"
          >
            <Image src={SettingButton} alt="Setting" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
};

export default TopNavigationBar;
