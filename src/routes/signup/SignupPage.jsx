import React from "react";
import logo from "../../assets/logo.svg";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { checkEmail } from "../../lib/apis/userApi";

import "./SignupPage.css";

export default function SignupPage() {
  const [pageNo, setPageNo] = useState(1);
  const [name, setName] = useState("");
  const [telNo, setTelNo] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [isAvailableEmail, setIsAvailableEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState(false);

  useEffect(() => {
    console.log(password, checkPassword);
    setVerifiedPassword(password === checkPassword);
  }, [password, checkPassword]);

  const onButtonClick = useCallback(
    (e) => {
      e.preventDefault();
      if (pageNo === 1) {
        setPageNo(2);
      } else {
        console.log("submit");
        const reqBody = {
          name,
          phoneNumber: telNo,
          birth,
          email,
          password,
        };

        console.log(reqBody);
      }
    },
    [pageNo, password, email]
  );

  const onEmailCheckClick = useCallback(
    async (e) => {
      e.preventDefault();
      // console.log(email);
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (emailRegex.test(email)) {
        const resp = await checkEmail(email);

        if (resp.msg === "available") {
          window.alert("사용 가능한 email 입니다");
          setIsAvailableEmail(true);
        } else {
          window.alert("사용중인 email 입니다.");
        }
      } else {
        window.alert("이메일 형식을 확인해주세요");
      }
    },
    [email]
  );

  return (
    <Container className="signup-page-container" style={{}}>
      <div className="mt-4 signup-content-container">
        <img className="top-logo" src={logo} alt="logo"></img>
        <div className="intro-msg-group">
          <p className="intro-msg">회원가입을 위해</p>
          <p className="intro-msg">정보를 입력해주세요.</p>
        </div>

        <div
          className="first-input-groups"
          style={{ display: pageNo == 1 ? "block" : "none" }}
        >
          <div className="input-group">
            <p>* 이름</p>
            <input
              name="name"
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="input-group">
            <p>* 휴대폰 번호</p>
            <input
              type="tel"
              onChange={(e) => {
                e.preventDefault();
                setTelNo(e.target.value);
              }}
            ></input>
          </div>
          <div className="input-group">
            <p>* 생년월일</p>
            <input
              // type="date"
              onChange={(e) => {
                e.preventDefault();
                setBirth(e.target.value);
              }}
              placeholder="YYYY.MM.DD"
            ></input>
          </div>
        </div>

        <div
          className="second-input-groups"
          style={{ display: pageNo == 2 ? "block" : "none" }}
        >
          <div className="input-group">
            <p>* 이메일</p>
            <input
              name="email"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            ></input>
            <Button
              variant="primary"
              disabled={isAvailableEmail}
              onClick={(e) => onEmailCheckClick(e)}
            >
              {isAvailableEmail ? "완료" : "확인"}
            </Button>
          </div>
          <div className="input-group">
            <p>* 비밀번호</p>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="input-group">
            <p>* 비밀번호 확인</p>
            <input
              type="password"
              name="checkPassword"
              onChange={(e) => {
                e.preventDefault();
                setCheckPassword(e.target.value);
              }}
            ></input>
            {checkPassword !== "" ? (
              !verifiedPassword ? (
                <>
                  <p style={{ color: "red" }}>비밀번호를 다시 확인해주세요</p>
                </>
              ) : (
                <>
                  <p style={{ color: "green" }}>사용 가능한 비밀번호 입니다</p>
                </>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <PrimaryButton
          text={pageNo === 1 ? "다음" : "가입하기"}
          minWidth="100%"
          onClick={onButtonClick}
        />
      </div>
    </Container>
  );
}
