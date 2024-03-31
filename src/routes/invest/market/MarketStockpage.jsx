import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./MarketStockpage.css";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { fetchShinhanMarket } from "../../../lib/apis/shinhanApi";
import Logo from "../../../assets/logo_white.png";
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
      <TopNavigationBar text="마켓 이슈"></TopNavigationBar>
      <Container className="strategy-container">
        {datas.map((data, index) => (
          <div
            className="strategy-data-container"
            onClick={() => window.open(`${data.attachment_url}`, "_blank")}
            key={index}
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
            <div className="market-img-container">
              <img
                src={Logo}
                alt=""
                style={{
                  width: "25vw",
                  height: "10vh",
                  backgroundSize: "cover",
                }}
              />
              <div style={{ width: "100%", textAlign: "right" }}>
                조회수 : {data.view_count}
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
