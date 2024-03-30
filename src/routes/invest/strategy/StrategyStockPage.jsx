import React, { useState, useEffect } from "react";
import { fetchShinhanInvest } from "../../../lib/apis/shinhanApi";
import { Container, Row, Col } from "react-bootstrap";
import "./StrategyStockPage.css";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import Logo from "../../../assets/logo_white.png";
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
        {datas.map((data, index) => (
          <div
            className="strategy-data-container"
            key={index}
            onClick={() => window.open(`${data.attachment_url}`, "_blank")}
          >
            <div className="strategy-content">
              <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                {data.title.slice(0, 15)}..
              </div>
              <div>{data.content.slice(0, 40)}..</div>
              <div>
                {data.writer}&ensp;{data.reg_date}
              </div>
            </div>
            <img
              src={Logo}
              alt=""
              style={{
                width: "25vw",
                height: "10vh",
                backgroundSize: "cover",
              }}
            />
          </div>
        ))}
      </Container>
    </>
  );
}
