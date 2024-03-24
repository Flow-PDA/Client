import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./MarketStockpage.css";
import { fetchShinhanMarket } from "../../../lib/apis/shinhanApi";

export default function MarketStockpage() {
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchShinhanMarket();
      console.log(response);
      setDatas(response);
    } catch (error) {
      if (error.response.status === 401) {
        console.log("throws");
        throwAuthError();
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container className="market-container">
        {datas.map((data) => (
          <div>
            <div>{data.title}</div>
            <div>{data.writer}</div>
            <div>{data.content.slice(0, 40)}</div>
          </div>
        ))}
      </Container>
    </>
  );
}
