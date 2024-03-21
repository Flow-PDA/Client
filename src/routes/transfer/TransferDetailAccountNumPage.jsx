import React, { useEffect, useState } from "react";
import shinhan_CI from "../../assets/shinhan_CI.png";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./TransferDetailAccountNumPage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchRecentAccountList,
  fetchTransferList,
} from "../../lib/apis/transfer";

export default function TransferDetailAccountNumPage() {
  const [recentAccountData, setRecentAccountData] = useState([]);
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [transferData, setTransferData] = useState([]);

  const navigate = useNavigate();

  const partyKey = 25; //partyKey 수정 필요

  const handleNextButtonClick = () => {
    navigate("/transfer/transferDetailPricePage", {
      state: { name: name, accountNumber: accountNumber },
    });
  };

  const handleRecentAccountClick = (selectedAccount) => {
    setName(selectedAccount.name);
    setAccountNumber(selectedAccount.accountNumber);
  };

  const callTransferData = async () => {
    try {
      const response = await fetchTransferList(partyKey);
      setTransferData(response);
    } catch (error) {
      console.error("이체 데이터 호출 중 에러:", error);
    }
  };

  const recentAccounts = recentAccountData
    .filter(
      (account, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.name === account.name && t.accountNumber === account.accountNumber
        )
    )
    .slice(0, 5);

  useEffect(() => {
    callTransferData();
  }, []);

  const callRecentAccountData = async () => {
    try {
      const response = await fetchRecentAccountList(partyKey);
      setRecentAccountData(response);
    } catch (error) {
      console.error("이체 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callRecentAccountData();
  }, []);

  return (
    <>
      <TopNavigationBar />
      <Container className="transfer-detail-page">
        <div className="transfer-how-sentence">어디로 돈을 보낼까요?</div>

        <Row className="transfer-form">
          <Col className="transfer-info">
            <p style={{ margin: "0", color: "#92969B", fontSize: "0.9rem" }}>
              * 이름
            </p>
            <input
              className="transfer-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p style={{ margin: "0", color: "#92969B", fontSize: "0.9rem" }}>
              * 계좌번호
            </p>
            <input
              className="transfer-input"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </Col>
        </Row>

        <div className="recent-account-sentence">최근 보낸 계좌</div>
        <div className="recent-account-container">
          {recentAccounts.map((data, index) => (
            <React.Fragment key={index}>
              <div
                className="recent-account"
                onClick={() => handleRecentAccountClick(data)}
              >
                <div className="recent-account-CI">
                  <img src={shinhan_CI} alt="shinhan_CI" width="35vw" />
                </div>
                <div className="recent-account-info">
                  <div className="recent-account-name">{data.name}</div>
                  <div className="recent-account-number">
                    신한투자증권 {data.accountNumber}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {name == "" || accountNumber == "" ? (
          <>
            <PrimaryButton
              style={{ marginTop: "auto" }}
              text="다음"
              minWidth="100%"
              onClick={handleNextButtonClick}
              disabled={true}
            />
          </>
        ) : (
          <PrimaryButton
            style={{ marginTop: "auto" }}
            text="다음"
            minWidth="100%"
            onClick={handleNextButtonClick}
            disabled={false}
          />
        )}
      </Container>
    </>
  );
}
