import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./SampleAskingPriceChart.css";
import Modal from "../../../../components/common/modal/StockAskingModal";

export default function SampleAskingPriceChart({ name }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedPercent, setSelectedPercent] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const handlePriceClick = (price, percent, type) => {
    setSelectedPrice(price);
    setSelectedPercent(percent);
    setModalOpen(true);
    setSelectedType(type);
  };

  // 승인 모달 열기 함수
  function openModal() {
    setModalOpen(true);
  }

  // 승인 모달 닫기 함수
  async function closeModal() {
    setModalOpen(false); // 승인 후 승인 대기 상태 해제
  }

  const [orderBook, setOrderBook] = useState({
    asks: [
      { price: 74200, quantity: 105, percent: 1.2 },
      { price: 74100, quantity: 150, percent: 1.18 },
      { price: 74000, quantity: 200, percent: 1.16 },
      { price: 73900, quantity: 250, percent: 1.14 },
      { price: 73800, quantity: 300, percent: 1.12 },
      { price: 73700, quantity: 100, percent: 1.1 },
      { price: 73600, quantity: 150, percent: 1.08 },
      { price: 73500, quantity: 200, percent: 1.05 },
      { price: 73400, quantity: 250, percent: 1.03 },
      { price: 73300, quantity: 600, percent: 1.01 },
    ],
    bids: [
      { price: 73200, quantity: 350, percent: 1.03 },
      { price: 73100, quantity: 400, percent: 1.05 },
      { price: 73000, quantity: 450, percent: 1.07 },
      { price: 72900, quantity: 500, percent: 1.08 },
      { price: 72800, quantity: 55, percent: 1.09 },
      { price: 72700, quantity: 35, percent: 1.1 },
      { price: 72600, quantity: 40, percent: 1.12 },
      { price: 72500, quantity: 45, percent: 1.15 },
      { price: 72400, quantity: 50, percent: 1.17 },
      { price: 72300, quantity: 55, percent: 1.19 },
    ],
    timestamp: Date.now(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateOrderBook();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateOrderBook = () => {
    setOrderBook((prevOrderBook) => ({
      ...prevOrderBook,
      timestamp: Date.now(),
      asks: prevOrderBook.asks.map((ask, index) => ({
        ...ask,
        quantity:
          index % 2 === 0
            ? Math.floor(Math.random() * (200 - 0 + 1)) + 10
            : Math.floor(Math.random() * (1500 - 100 + 1)) + 100,
      })),
      bids: prevOrderBook.bids.map((bid, index) => ({
        ...bid,
        quantity:
          index % 2 === 1
            ? Math.floor(Math.random() * (200 - 0 + 1)) + 10
            : Math.floor(Math.random() * (1500 - 100 + 1)) + 100,
      })),
    }));
  };

  const sumQuantity = (asks, bids) => {
    var sum = 0;
    for (var i of asks) {
      sum += Number(i.quantity);
    }
    for (var j of bids) {
      sum += Number(j.quantity);
    }
    return sum;
  };

  const renderAsks = (asks, sum, timestamp) => {
    return _.orderBy(asks, "price", "desc").map((v) => {
      const width =
        (v.quantity / sum) * 100 > 100
          ? "100%"
          : (v.quantity / sum) * 100 + "%";

      const height = "100%";

      const marginLeft =
        width === "100%" ? "0" : 100 - (v.quantity / sum) * 100 + "%";
      const key = timestamp + v.price;

      const askClassName = v.price === 73500 ? "ask-highlight" : "";
      return (
        <tr key={key} className={askClassName}>
          <td className="td-quantity">
            <div
              className="per-bar-asks"
              style={{
                height: `${height}`,
                width: `${width}`,
                marginLeft: `${marginLeft}`,
              }}
            />
            <div className="quantity quantity-asks">{Number(v.quantity)}</div>
          </td>

          <td
            className={`td-price asks-price`}
            onClick={() => handlePriceClick(v.price, v.percent, "asks")}
          >
            {v.price.toLocaleString()}
          </td>
          <td
            className="td-percent asks-percent"
            onClick={() => handlePriceClick(v.price, v.percent, "asks")}
          >
            +{v.percent.toLocaleString()}%
          </td>

          <td></td>
        </tr>
      );
    });
  };

  const renderBids = (bids, sum, timestamp) => {
    return bids.map((v) => {
      var width =
        (v.quantity / sum) * 100 > 100
          ? "100%"
          : (v.quantity / sum) * 100 + "%";
      const key = timestamp + v.price;
      const height = "100%";
      const askClassName = v.price === 73500 ? "ask-highlight" : "";
      return (
        <tr key={key} className={askClassName}>
          <td></td>
          <td
            className="td-price bids-price"
            onClick={() => handlePriceClick(v.price, v.percent, "bids")}
          >
            {v.price.toLocaleString()}{" "}
          </td>
          <td
            className="td-percent bids-percent"
            onClick={() => handlePriceClick(v.price, v.percent, "bids")}
          >
            -{v.percent.toLocaleString()}%
          </td>
          <td className="td-quantity">
            <div
              className="per-bar-bids"
              style={{
                width: `${width}`,
                height: `${height}`,
              }}
            />
            <div className="quantity quantity-bids">{Number(v.quantity)}</div>
          </td>
        </tr>
      );
    });
  };

  //   if (isLoading) {
  //     return <MDSpinner className="mb-5" size={30} />;
  //   }

  const { asks, bids } = orderBook;
  const sum = sumQuantity(asks, bids);

  return (
    <div className="box_orderbook bg-white rounded shadow-sm">
      <table className="orderbook table">
        <Modal
          isOpen={modalOpen}
          closeModal={(e) => closeModal()}
          stockPrice={selectedPrice}
          stockPercent={selectedPercent}
          type={selectedType}
          name={name}
        />

        <tbody>
          {renderAsks(asks, sum, orderBook.timestamp)}
          {renderBids(bids, sum, orderBook.timestamp)}
        </tbody>
      </table>
    </div>
  );
}
