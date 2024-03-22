import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import "./MyPartyTransactionDetail.css";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Link } from "react-router-dom";
import { fetchTransferList } from "../../../lib/apis/transfer";

export default function MyPartyTransactionDetail() {
  const [transferData, setTransferData] = useState([]);

  const partyKey = 25; //TODO: 수정 필요
  const callTransferData = async () => {
    try {
      const response = await fetchTransferList(partyKey);
      setTransferData(response);
    } catch (error) {
      console.error("이체 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callTransferData();
  }, []);

  let deposit = 0;

  if (transferData[0]) {
    deposit = transferData[0].deposit;
  }

  return (
    <>
      <TopNavigationBar text={"거래내역"} />
      <Container>
        <div className="full-transaction-history-sentence">전체 내역</div>

        <React.Fragment>
          <Row>
            <Col xs={2} className="transaction-date">
              3.20
            </Col>
            <Col xs={4} className="transaction-stock-name">
              삼성전자
            </Col>
            <Col xs={6} className="transaction-name">
              이선영
            </Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={10} className="transaction-second-line transaction-detail">
              <span className="red-text">1주 구매 (주당 65,400원)</span>
            </Col>
          </Row>
          <Row>
            <Col xs={2} className="transaction-date"></Col>
            <Col xs={4} className="transaction-stock-name">
              하이트 진로
            </Col>
            <Col xs={6} className="transaction-name">
              김민우
            </Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={10} className="transaction-second-line transaction-detail">
              <span className="red-text">1주 구매 (주당 65,400원)</span>
            </Col>
          </Row>
          <Row>
            <Col xs={2} className="transaction-date">
              3.18
            </Col>
            <Col xs={4} className="transaction-stock-name">
              삼성전자
            </Col>
            <Col xs={6} className="transaction-name">
              한다현
            </Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={10} className="transaction-second-line transaction-detail">
              <span className="red-text">1주 구매 (주당 65,400원)</span>
            </Col>
          </Row>
        </React.Fragment>
      </Container>
    </>
  );
}
