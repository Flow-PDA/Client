import { Button, Col, Container, Row } from "react-bootstrap";
import "./InterestPage.css";
import HorizontalLine from "../../components/line/HorizontalLine.jsx";
import { useEffect, useState } from "react";
import { delApproved, getApproved } from "../../lib/apis/interest.jsx";
import Modal from "../../components/common/modal/ApproveInterestModal.jsx";
import { useParams } from "react-router-dom";

export default function InterestApproval() {
  const partyKey = useParams().partyKey;
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(0);
  const [stock, setStock] = useState([]);
  const [isInterestStock, setIsInterestStock] = useState(false);

  useEffect(() => {
    console.log("ApprovalPage", partyKey);
    async function fetchData() {
      try {
        const res = await getApproved(partyKey); // 임시로 1로 세팅
        setStock(res.data.result);

        console.log(stock);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData(); // fetchData 함수를 즉시 호출합니다.
  }, []);

  // 거절 모달 열기 함수
  function openRemoveModal(interestStockKey) {
    setRemoveModalIsOpen(interestStockKey);
  }

  // 거절 모달 닫기 함수
  async function closeRemoveModal(partyKey, interestStockKey) {
    const reqBody = {
      isApproved: false,
    };

    await delApproved(partyKey, interestStockKey);
    setRemoveModalIsOpen(0);
    const updatedStock = stock.filter(
      (stock) => stock.interestStockKey !== interestStockKey
    ); // 선택된 주식을 제외한 주식 목록
    setStock(updatedStock); // 주식 목록 업데이트
  }

  return (
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
            <Col xs={6}>
              <Row className="interest-company">{data.stockName}</Row>
              <Row className="interest-name">{data.name}</Row>
            </Col>
            <Col xs={4} className="interest-remove-button-col">
              <Button
                className="interest-remove-button"
                onClick={() => openRemoveModal(data.interestStockKey)}
              >
                종목빼기
              </Button>
              <Modal
                isOpen={removeModalIsOpen === data.interestStockKey}
                closeModal={(e) =>
                  closeRemoveModal(partyKey, data.interestStockKey)
                } //1은 임시로 넣어놓은 partyKey
                stockName={data.stockName}
                buttonText="종목빼기"
                color="#f46060"
              />
            </Col>
            <HorizontalLine />
          </Row>
        ))}
    </Container>
  );
}
