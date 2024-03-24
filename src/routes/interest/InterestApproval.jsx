import { Button, Col, Container, Row } from "react-bootstrap";
import "./InterestPage.css";
import HorizontalLine from "../../components/line/HorizontalLine.jsx";
import { useEffect, useState } from "react";
import { delApproved, getApproved } from "../../lib/apis/interest.jsx";
import Modal from "../../components/common/modal/ApproveInterestModal.jsx";

const InterestApproval = () => {
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getApproved(1); // 임시로 1로 세팅
        setStock(res.data.result);
        console.log(stock);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData(); // fetchData 함수를 즉시 호출합니다.
  }, []);

  // 거절 모달 열기 함수
  function openRemoveModal() {
    setRemoveModalIsOpen(true);
  }

  // 거절 모달 닫기 함수
  async function closeRemoveModal(partyKey, interestStockKey) {
    const reqBody = {
      isApproved: false,
    };

    await delApproved(partyKey, interestStockKey);
    setRemoveModalIsOpen(false);
    window.location.reload();
  }

  return (
    <Container>
      {stock.length > 0 &&
        stock.map((data, index) => (
          <Row className="interest-list" key={index}>
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
                onClick={openRemoveModal}
              >
                종목빼기
              </Button>
              <Modal
                isOpen={removeModalIsOpen}
                closeModal={(e) => closeRemoveModal(1, data.interestStockKey)} //1은 임시로 넣어놓은 partyKey
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
};

export default InterestApproval;
