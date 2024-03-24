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
            <Col xs={2} style={{ fontSize: "1.3rem" }}>
              {index + 1}
            </Col>
            <Col xs={4}>
              <img
                className="rising-stock-img"
                src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${data.stock_code}.png`}
                alt="stock"
              />
            </Col>
            <Col xs={6}>
              <div>{data.stbd_nm}</div>
              <div>{data.stock_code}</div>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}
