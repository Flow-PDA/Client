import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./TransferDetailPricePage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchTransferList } from "../../lib/apis/transfer";

export default function TransferDetailPricePage() {
  const location = useLocation();
  const name = location.state.name;
  const accountNumber = location.state.accountNumber;
  const [price, setPrice] = useState("");
  const [transferData, setTransferData] = useState([]);
  const partyKey = useParams().partyKey;

  const navigate = useNavigate();

  const callTransferData = async () => {
    try {
      const response = await fetchTransferList(partyKey);
      setTransferData(response);
    } catch (error) {
      if (error.response.status === 401) {
        console.log("throws");
        throwAuthError();
      }
      console.error("이체 데이터 호출 중 에러:", error);
    }
  };

  const handleNextButtonClick = () => {
    if (price < deposit) {
      navigate(`/transfer/${partyKey}/transferDetailConfirmPage`, {
        state: { name: name, accountNumber: accountNumber, price: price },
      });
    } else {
      alert("이체 가능한 금액보다 큽니다!");
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
      <TopNavigationBar />
      <Container className="transfer-detail-page">
        <div className="transfer-how-sentence">얼마나 옮길까요?</div>
        <div className="account-info">
          <div className="account-name">{name}</div>
          <div className="account-number">신한투자증권 {accountNumber}으로</div>
        </div>

        <Row className="transfer-form">
          <Col className="transfer-info">
            <p style={{ margin: "0", color: "#92969B", fontSize: "0.9rem" }}>
              * 금액
            </p>
            <input
              className="transfer-input"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
        </Row>

        <div>
          <div className="transfer-possible-deposit">
            이체 가능 금액: {deposit.toLocaleString()}원
          </div>
        </div>

        <PrimaryButton
          style={{ marginTop: "auto" }}
          text="다음"
          minWidth="100%"
          onClick={handleNextButtonClick}
        />
      </Container>
    </>
  );
}
