import React from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import "./TransferPage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";

export default function TransferPage() {
  return (
    <Container>
      <TopNavigationBar text={"이체하기"} />
      <div className="transfer-possible-price-sentence">이체 가능 금액</div>
      <div className="transfer-possible-price">
        {(4182553).toLocaleString()}원
      </div>
      <PrimaryButton text="시작하기" minWidth="100%" />
      <hr />
      <div className="full-transfer-sentence">전체 내역</div>
      <div className="full-transfer-history">
        <div className="transfer-first-line">
          <div className="transfer-date">3.8 </div>
          <div className="transfer-name">정찬진</div>
          <div className="transfer-price">{(200000).toLocaleString()}원</div>
        </div>
        <div className="transfer-second-line transfer-deposit">
          {(4182553).toLocaleString()}원
        </div>
        <div className="transfer-first-line">
          <div className="transfer-date">3.8 </div>
          <div className="transfer-name">정찬진</div>
          <div className="transfer-price">{(200000).toLocaleString()}원</div>
        </div>
        <div className="transfer-second-line transfer-deposit">
          {(4182553).toLocaleString()}원
        </div>
      </div>
    </Container>
  );
}
