import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./SampleAskingPriceChart.css";
import Modal from "../../../../components/common/modal/StockAskingModal";
import io from "socket.io-client";

export default function SampleAskingPriceChart({
  stockCode,
  endPrice,
  currentPrice,
  stockName,
  stockBalance,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedPercent, setSelectedPercent] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간 상태 추가

  const handlePriceClick = (price, percent, type) => {
    setSelectedPrice(price);
    setSelectedPercent(percent);
    setModalOpen(true);
    setSelectedType(type);
  };

  // state for socketIo
  const [socketIo, setSocketIo] = useState(null);

  // update price
  const updatePrice = (data) => {
    // asks
    const asks = data.sellList.map((elem) => {
      const percent = (((Number(elem[0]) - endPrice) / endPrice) * 100).toFixed(
        2
      );
      return {
        price: elem[0],
        quantity: elem[1],
        percent: percent,
      };
    });
    // bids
    const bids = data.buyList.map((elem) => {
      const percent = (((Number(elem[0]) - endPrice) / endPrice) * 100).toFixed(
        2
      );
      return { price: elem[0], quantity: elem[1], percent: percent };
    });

    setOrderBook({
      timestamp: Date.now(),
      asks: asks,
      bids: bids,
    });
  };

  // when mounted
  useEffect(() => {
    // socketIo init.
    const WS_URL = import.meta.env.VITE_WS_URL;
    if (WS_URL !== undefined) {
      const _socketIo = io.connect(WS_URL);
      _socketIo.on("connect", () => {
        console.log("socket connected");
      });
      _socketIo.on("update", (data) => {
        // console.log(data);
        updatePrice(data);
      });

      setSocketIo(_socketIo);
    } else {
      console.log("WS URL not defined");
    }
  }, []);

  // when socketIo modified
  useEffect(() => {
    if (socketIo !== null) {
      // socketIo initiated
      // 2|005930 - 삼성전자 호가, 1|005930 - 삼성전자 체결가
      const temp = `2|${stockCode}`;
      // REGISTER_SUB : 등록, RELEASE_SUB : 해제
      socketIo.emit("REGISTER_SUB", temp);
    }
  }, [socketIo]);

  //시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // 매 초마다 현재 시간 업데이트
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 해제
  }, []);

  // 모달 열기 함수
  function openModal() {
    setModalOpen(true);
  }

  // 모달 닫기 함수
  async function closeModal() {
    setModalOpen(false);
  }

  const [orderBook, setOrderBook] = useState({
    asks: [],
    bids: [],
    timestamp: Date.now(),
  });

  const sumQuantityAsk = (asks) => {
    var sum = 0;
    for (var i of asks) {
      sum += Number(i.quantity);
    }

    return sum;
  };

  const sumQuantityBid = (bids) => {
    var sum = 0;
    for (var i of bids) {
      sum += Number(i.quantity);
    }

    return sum;
  };

  const renderAsks = (asks, sum, timestamp) => {
    return _.orderBy(asks, "price", "desc").map((v) => {
      const width =
        (v.quantity / sum) * 300 > 100
          ? "100%"
          : (v.quantity / sum) * 300 + "%";

      const height = "100%";

      const marginLeft =
        width === "100%" ? "0" : 100 - (v.quantity / sum) * 300 + "%";
      const key = timestamp + v.price;

      const askClassName = v.price === currentPrice ? "ask-highlight" : "";
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
            className={
              v.percent > 0
                ? "td-price red-text"
                : v.percent == 0
                ? "td-price black-text"
                : "td-price blue-text"
            }
            onClick={() => handlePriceClick(v.price, v.percent, "asks")}
          >
            {Number(v.price).toLocaleString()}
          </td>
          <td
            className={
              v.percent > 0
                ? "td-price red-text"
                : v.percent == 0
                ? "td-price black-text"
                : "td-price blue-text"
            }
            onClick={() => handlePriceClick(v.price, v.percent, "asks")}
          >
            {v.percent.toLocaleString()}%
          </td>

          <td></td>
        </tr>
      );
    });
  };

  const renderBids = (bids, sum, timestamp) => {
    return bids.map((v) => {
      var width =
        (v.quantity / sum) * 300 > 100
          ? "100%"
          : (v.quantity / sum) * 300 + "%";
      const key = timestamp + v.price;
      const height = "100%";
      const askClassName = v.price === currentPrice ? "ask-highlight" : "";
      return (
        <tr key={key} className={askClassName}>
          <td></td>
          <td
            className={
              v.percent > 0
                ? "td-price red-text"
                : v.percent == 0
                ? "td-price black-text"
                : "td-price blue-text"
            }
            onClick={() => handlePriceClick(v.price, v.percent, "bids")}
          >
            {Number(v.price).toLocaleString()}{" "}
          </td>
          <td
            className={
              v.percent > 0
                ? "td-price red-text"
                : v.percent == 0
                ? "td-price black-text"
                : "td-price blue-text"
            }
            onClick={() => handlePriceClick(v.price, v.percent, "bids")}
          >
            {v.percent.toLocaleString()}%
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

  const { asks, bids } = orderBook;
  const sumAsk = sumQuantityAsk(asks);
  const sumBid = sumQuantityBid(bids);

  return (
    <div className="box_orderbook bg-white rounded shadow-sm">
      <table className="orderbook table">
        {/* {currentTime.getHours() >= 9 &&
          currentTime.getHours() < 15 &&
          (currentTime.getHours() !== 15 || currentTime.getMinutes() < 30) && ( */}
        <Modal
          isOpen={modalOpen}
          closeModal={(e) => closeModal()}
          stockPrice={selectedPrice}
          stockPercent={selectedPercent}
          type={selectedType}
          stockBalance={stockBalance}
          name={stockName}
        />
        {/* )} */}

        <tbody>
          {renderAsks(asks, sumAsk, orderBook.timestamp)}
          {renderBids(bids, sumBid, orderBook.timestamp)}
        </tbody>
      </table>
    </div>
  );
}
