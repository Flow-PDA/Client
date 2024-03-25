import React, { useState, useEffect } from "react";
import { fetchShinhanInvest } from "../../../lib/apis/shinhanApi";
import { Container, Row, Col } from "react-bootstrap";
import "./StrategyStockPage.css";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";

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
      <TopNavigationBar text="투자 전략"></TopNavigationBar>
      <Container className="strategy-container">
        {datas.map((data) => (
          <div className="strategy-data-container">
            <div className="strategy-content">
              <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                {data.title.slice(0, 15)}..
              </div>
              <div>{data.content.slice(0, 40)}..</div>
              <div>
                {data.writer}&ensp;{data.reg_date}
              </div>
            </div>
            <div
              style={{
                width: "30vw",
                height: "10vh",
                backgroundSize: "cover",
                backgroundImage:
                  "url(data:image/jpeg;base64,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)",
              }}
            ></div>
          </div>
        ))}
      </Container>
    </>
  );
}
