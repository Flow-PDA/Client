import React, { useCallback, useState } from "react";
import logo from "../../assets/logo.svg";
import { Container } from "react-bootstrap";

import "./LoginPage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(email, password);
    },
    [email, password]
  );

  return (
    <Container className="login-page-container">
      <div className="mt-4 signup-content-container">
        <img className="top-logo" src={logo} alt="logo"></img>
        <div className="intro-msg-group">
          <p className="intro-msg">가입하신 이메일 주소로</p>
          <p className="intro-msg">로그인해주세요.</p>
        </div>

        <div className="first-input-groups">
          <div className="input-group">
            <p>이메일</p>
            <input
              name="name"
              type="email"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="input-group">
            <p>비밀번호</p>
            <input
              type="password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <PrimaryButton
          text="로그인"
          minWidth="100%"
          onClick={(e) => onLoginClick(e)}
        />
      </div>
    </Container>
  );
}
