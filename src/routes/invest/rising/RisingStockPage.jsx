import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./RisingStockPage.css";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { fetchShinhanRising } from "../../../lib/apis/shinhanApi";

export default function RisingStockPage() {
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchShinhanRising();
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
      <TopNavigationBar text="지금 뜨는 테마 보기"></TopNavigationBar>
      <Container className="rising-container">
        {datas.map((data, index) => (
          <Row key={data.stock_code} className="rising-stock">
            {/* style={{ fontSize: "1.3rem" }} */}
            <Col
              xs={2}
              className={
                index === 0
                  ? "gold-text"
                  : index === 1
                  ? "silver-text"
                  : index === 2
                  ? "brown-text"
                  : "normal-text"
              }
            >
              {index + 1}
            </Col>
            <Col xs={4}>
              <img
                className="rising-stock-img"
                src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${data.stock_code}.png`}
                alt="stock"
              />
            </Col>
            <Col xs={6} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                {data.stbd_nm}
              </div>
              <div>{data.stock_code}</div>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}
