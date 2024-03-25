import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./SampleAskingPriceChart.css";
// import MDSpinner from "react-md-spinner";

export default function SampleAskingPriceChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedPrice, setSelectedPrice] = useState(null); // 선택된 가격 상태 추가
  const [selectedPercent, setSelectedPercent] = useState(null); // 선택된 퍼센트 상태 추가

  const handlePriceClick = (price, percent) => {
    setSelectedPrice(price);
    setSelectedPercent(percent);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  console.log(modalOpen);

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

  const numberWithCommas = (x) => {
    return x.toLocaleString();
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
            onClick={() => handlePriceClick(v.price, v.percent)} // 모달을 열기 위해 클릭 핸들러 추가
          >
            {numberWithCommas(v.price)}
          </td>
          <td
            className="td-percent asks-percent"
            onClick={() => handlePriceClick(v.price, v.percent)} // 모달을 열기 위해 클릭 핸들러 추가
          >
            +{numberWithCommas(v.percent)}%
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
          <td className="td-price bids-price">{numberWithCommas(v.price)} </td>
          <td className="td-percent bids-percent">
            -{numberWithCommas(v.percent)}%
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
        {/* <thead className="table-active">
          <tr>
            <th className="text-left" colSpan="4">
              일반호가
            </th>
          </tr>
        </thead> */}
        <tbody>
          {renderAsks(asks, sum, orderBook.timestamp)}
          {renderBids(bids, sum, orderBook.timestamp)}
        </tbody>
      </table>
      {/* TODO: modal 보이게하기 */}
      {/* {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>Price: {selectedPrice}</p>
            <p>Percent: {selectedPercent}%</p>
          </div>
        </div>
      )} */}
    </div>
  );
}
