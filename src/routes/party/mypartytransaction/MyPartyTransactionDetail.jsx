import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import "./MyPartyTransactionDetail.css";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { Link } from "react-router-dom";
import { fetchTransactionDetail } from "../../../lib/apis/party";

export default function MyPartyTransactionDetail() {
  const [transactionData, setTransactionData] = useState([]);

  const partyKey = 1; //TODO: 수정 필요
  const callTransactionData = async () => {
    try {
      const response = await fetchTransactionDetail(partyKey);
      setTransactionData(response);
    } catch (error) {
      console.error("이체 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callTransactionData();
  }, []);

  return (
    <>
      <TopNavigationBar text={"거래내역"} type={2} />
      <Container>
        <div className="full-transaction-history-sentence">전체 내역</div>
        {transactionData.map((data, index) => (
          <React.Fragment key={index}>
            <Row>
              {index === 0 ||
              `${new Date(data.createdAt).getMonth() + 1}.${new Date(
                data.createdAt
              ).getDate()}` !==
                `${
                  new Date(transactionData[index - 1].createdAt).getMonth() + 1
                }.${new Date(
                  transactionData[index - 1].createdAt
                ).getDate()}` ? (
                <Col xs={2} className="transaction-date">
                  {`${new Date(data.createdAt).getMonth() + 1}.${new Date(
                    data.createdAt
                  ).getDate()}`}
                </Col>
              ) : (
                <Col xs={2} className="transaction-date"></Col>
              )}

              <Col xs={4} className="transaction-stock-name">
                {data.stockName}
              </Col>
              <Col xs={6} className="transaction-name">
                {data.name}
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col
                xs={10}
                className="transaction-second-line transaction-detail"
              >
                {data.transactionType === 0 ? (
                  <span className="red-text">
                    {data.volume}주 구매 (주당 {data.price.toLocaleString()}원)
                  </span>
                ) : (
                  <span className="blue-text">
                    {data.volume}주 판매 (주당 {data.price.toLocaleString()}원)
                  </span>
                )}
              </Col>
            </Row>
          </React.Fragment>
        ))}
      </Container>
    </>
  );
}
