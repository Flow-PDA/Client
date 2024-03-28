import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./SampleAskingPriceChart.css";
import Modal from "../../../../components/common/modal/StockAskingModal";
import io from "socket.io-client";

export default function SampleAskingPriceChart({ name, stockCode }) {
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

  // state for socketIo
  const [socketIo, setSocketIo] = useState(null);

  // update price
  const updatePrice = (data) => {
    // bids
    const bids = data.buyList.map((elem) => {
      // TODO: calc. percent
      return { price: elem[0], quantity: elem[1], percent: 1.23 };
    });

    // asks
    const asks = data.sellList.map((elem) => {
      // TODO: calc. percent
      return { price: elem[0], quantity: elem[1], percent: -1.23 };
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
    const _socketIo = io.connect(import.meta.env.VITE_WS_URL);
    _socketIo.on("connect", () => {
      console.log("socket connected");
    });
    _socketIo.on("update", (data) => {
      // console.log(data);
      updatePrice(data);
    });

    setSocketIo(_socketIo);
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

  // 승인 모달 열기 함수
  function openModal() {
    setModalOpen(true);
  }

  // 승인 모달 닫기 함수
  async function closeModal() {
    setModalOpen(false); // 승인 후 승인 대기 상태 해제
  }

  const [orderBook, setOrderBook] = useState({
    asks: [],
    bids: [],
    timestamp: Date.now(),
  });

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
