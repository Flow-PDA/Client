import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";

// 모달 스타일을 설정합니다.
const customStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100%",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    top: "50%", // 모달을 화면 중앙에 위치시킵니다.
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none", // 테두리 없음
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 그림자
    borderRadius: "20px", // 모달 창 모서리를 둥글게 만듭니다.
    minWidth: "80vw", // 최대 너비
  },
};

const StockAskingModal = ({
  isOpen,
  closeModal,

  stockPrice,
  stockPercent,
  type,
  color = "#375AFF",
  name,
  stockBalance,
  stockInfo,
}) => {
  const navigate = useNavigate();
  const { partyKey, stockKey } = useParams();

  const handleBuyButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/tradeStock`, {
      state: {
        stockName: name,
        stockPrice: stockPrice,
        type: "구매",
        stockBalance: stockBalance,
      },
    });
  };

  const handleSellButtonClick = () => {
    navigate(`/stockDetail/${partyKey}/${stockKey}/tradeStock`, {
      state: {
        stockName: name,
        stockPrice: stockPrice,
        type: "판매",
        stockBalance: stockBalance,
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="stock-modal-container" style={{ display: "flex" }}>
        <Button
          className="stock-detail-sell-button"
          style={{ margin: "0" }}
          onClick={handleSellButtonClick}
        >
          <div className="stock-detail-sell-text">판매</div>
        </Button>
        <div style={{ margin: "0 5vw", width: "80%", textAlign: "center" }}>
          <div style={{ fontSize: "1.2rem" }}>
            <span style={{ fontWeight: 600 }}>
              {stockPrice ? stockPrice.toLocaleString() : 0}원
            </span>
          </div>
          <div style={{ fontSize: "1.0rem", color: "rgb(133 129 129)" }}>
            {type === "asks" ? (
              <span style={{ fontWeight: 500 }}>{stockPercent}%</span>
            ) : (
              <span style={{ fontWeight: 500 }}>{stockPercent}%</span>
            )}
          </div>
        </div>
        <Button
          className="stock-detail-buy-button"
          style={{ margin: "0" }}
          onClick={handleBuyButtonClick}
        >
          <div className="stock-detail-buy-text">구매</div>
        </Button>
      </div>
    </Modal>
  );
};

export default StockAskingModal;
