import { Button, Col, Row } from "react-bootstrap";
import { getApproval, regist } from "../../../lib/apis/interest";
import { useState, useEffect } from "react";
import ApproveInterestModal from "../../../components/common/modal/ApproveInterestModal"; // ApproveInterestModal 임포트

export default function TradeButton({
  stockInfo,
  stockBalance,
  partyKey,
  stockKey,
}) {
  const [isInterestStock, setIsInterestStock] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchIsApproved();
    console.log(stockBalance);
  }, []);

  async function fetchIsApproved() {
    try {
      const mystock = await getApproval(partyKey).then((data) => {
        return data.data.result;
      });

      const isActive =
        mystock.find((data) => data.stockKey === stockKey) !== undefined;
      setIsInterestStock(isActive);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddToInterestStock() {
    try {
      console.log("Stock added to interest stock!");
      const reqBody = {
        stockKey: stockKey,
      };

      await regist(partyKey, reqBody);
      setIsModalOpen(true); // 모달 열기
      setIsInterestStock(true); //
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {stockBalance.data ? (
        <Row className="stock-detail-transaction-button">
          <Button className="stock-detail-sell-button">
            <div className="stock-detail-sell-text">판매하기</div>
          </Button>

          <Button className="stock-detail-buy-button">
            <div className="stock-detail-buy-text">구매하기</div>
          </Button>
        </Row>
      ) : (
        <Row className="stock-detail-transaction-button">
          <Col>
            <Button
              className="stock-detail-interest-button"
              onClick={handleAddToInterestStock} // 클릭 핸들러 변경
              disabled={isInterestStock === true}
            >
              <div className="stock-detail-interest-text">찜하기</div>
            </Button>
          </Col>
        </Row>
      )}
      {console.log(stockInfo)}
      {/* 모달 추가 */}
      <ApproveInterestModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        stockName={stockInfo.stockName} // 수정된 부분
        buttonText="찜하기"
        color="#f46060"
      />
    </>
  );
}