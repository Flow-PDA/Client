import React, { useState, useEffect } from "react";
import { fetchShinhanInvest } from "../../../lib/apis/shinhanApi";
import { Container, Row, Col } from "react-bootstrap";
import "./StrategyStockPage.css";

export default function StrategyStockPage() {
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchShinhanInvest();
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
      1
      <Container className="strategy-container">
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
