import { Button, Col, Container, Row } from "react-bootstrap";
import "./InterestPage.css";
import HorizontalLine from "../../components/line/HorizontalLine";
import { useEffect, useState } from "react";
import { getApproval, vote } from "../../lib/apis/interest";
import Modal from "../../components/common/modal/ApproveInterestModal";

export default function InterestPending({ partyKey }) {
  const [stock, setStock] = useState([]);
  const [approveModalIsOpen, setApproveModalIsOpen] = useState(0);
  const [rejectModalIsOpen, setRejectModalIsOpen] = useState(0);
  // const [isApprovalPending, setIsApprovalPending] = useState(false); // 승인 대기 상태 추가

  useEffect(() => {
    console.log("PendingPage", partyKey);
    async function fetchData() {
      try {
        const res = await getApproval(partyKey);
        setStock(res.data.result);
      } catch (error) {
        console.error(error);
        throw Error(error);
      }
    }

    fetchData(); // fetchData 함수를 즉시 호출합니다.
  }, []);

  // 승인 모달 열기 함수
  function openApproveModal(interestStockKey) {
    setApproveModalIsOpen(interestStockKey);
  }

  // 승인 모달 닫기 함수
  async function closeApproveModal(partyKey, interestStockKey) {
    const reqBody = {
      isApproved: true,
    };
    await vote(partyKey, interestStockKey, reqBody);
    setApproveModalIsOpen(0); // 승인 후 승인 대기 상태 해제
    updateStockData(); // 상태를 업데이트하여 리렌더링
  }

  // 거절 모달 열기 함수
  function openRejectModal(interestStockKey) {
    setRejectModalIsOpen(interestStockKey);
  }

  // 거절 모달 닫기 함수
  async function closeRejectModal(partyKey, interestStockKey) {
    const reqBody = {
      isApproved: false,
    };

    await vote(partyKey, interestStockKey, reqBody); // partyKey, interestStockKey, reqBody
    setRejectModalIsOpen(false);
    updateStockData(); // 상태를 업데이트하여 리렌더링
  }

  // 데이터를 다시 가져와서 상태를 업데이트하는 함수
  async function updateStockData() {
    try {
      const res = await getApproval(partyKey);
      setStock(res.data.result);
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  }

  return (
    <>
      <Container>
        {stock.length > 0 &&
          stock.map((data, index) => (
            <Row className="interest-list" key={index}>
              {console.log(data)}
              <Col xs={2} className="interest-date">
                {`${new Date(data.createdAt).getMonth() + 1}.${new Date(
                  data.createdAt
                ).getDate()}`}
              </Col>
              <Col xs={4}>
                <Row className="interest-company">{data.stockName}</Row>
                <Row className="interest-name">{data.name}</Row>
              </Col>
              {console.log("stock", data)}
              <Col xs={1} className="interest-approve">
                {data.participantApprovalCnt}/{data.partyMemberCnt}
              </Col>
              <Col xs={5} className="interest-button-group">
                <Button
                  className="interest-yes-button"
                  onClick={() => openApproveModal(data.interestStockKey)}
                  disabled={data.isApproved === true}
                >
                  수락
                </Button>

                <Modal
                  isOpen={approveModalIsOpen === data.interestStockKey}
                  closeModal={(e) =>
                    closeApproveModal(partyKey, data.interestStockKey)
                  } //1은 임시로 넣어놓은 partyKey
                  stockName={data.stockName}
                  buttonText="수락"
                />

                <Button
                  className="interest-no-button"
                  onClick={() => openRejectModal(data.interestStockKey)}
                  disabled={data.isApproved === false}
                >
                  거절
                </Button>
                <Modal
                  isOpen={rejectModalIsOpen === data.interestStockKey}
                  closeModal={(e) =>
                    closeRejectModal(partyKey, data.interestStockKey)
                  } //1은 임시로 넣어놓은 partyKey
                  stockName={data.stockName}
                  buttonText="거절"
                  color="#f46060"
                />
              </Col>
              <HorizontalLine />
            </Row>
          ))}
      </Container>
    </>
  );
}
