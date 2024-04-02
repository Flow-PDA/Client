import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import io from "socket.io-client";
import "./RisingStockPage.css";
import { useNavigate } from "react-router-dom";
import TopNavigationBar from "../../../components/common/nav/TopNavigationBar";
import { fetchShinhanRising } from "../../../lib/apis/shinhanApi";
import { AuthContext } from "../../../lib/contexts/AuthContext";

const WS_URL = import.meta.env.VITE_WS_URL;

export default function RisingStockPage() {
  const [datas, setDatas] = useState([]);
  const [socketIo, setSocketIo] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const { throwAuthError } = useContext(AuthContext);
  const navigate = useNavigate()
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
    // init WS connection
    if (WS_URL !== undefined) {
      const _socketIo = io.connect(WS_URL);
      _socketIo.on("connect", () => {
        console.log("socket connected");
      });
      _socketIo.on("update", (data) => {
        // console.log(data);
        setUpdatedData(data);
      });

      setSocketIo(_socketIo);
    } else {
      console.log("WS URL not defined");
    }
  }, []);

  useEffect(() => {
    datas.forEach((elem) => {
      const temp = `1|${elem.stock_code}`;
      socketIo?.emit("REGISTER_SUB", temp);
    });

    return () => {
      datas.forEach((elem) => {
        const temp = `2|${elem.stock_code}`;
        socketIo?.emit("RELEASE_SUB", temp);
      });
    };
  }, [datas]);

  useEffect(() => {
    return () => {
      if (socketIo != null) {
        socketIo.disconnect();
      }
    };
  }, [socketIo]);

  useEffect(() => {
    if (updatedData != null) {
      const newData = datas.map((elem) => {
        if (elem.stock_code === updatedData[0]) {
          return {
            ...elem,
            stock_code: updatedData[0],
            price: updatedData[1],
            prdy_vrss_sign: updatedData[2],
            prdy_vrss: updatedData[3],
            prdy_ctrt: updatedData[4],
          };
        } else return elem;
      });
      setUpdatedData(null);
      setDatas(newData);
    }
  }, [updatedData, datas]);
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
              {/* <div>{data.stock_code}</div> */}
              <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>{data.price ? Number(data.price).toLocaleString() : 0}원</div>
              <div style={{ fontSize: "1rem", fontWeight: "600" }}>{`${data?.prdy_vrss} (${data?.prdy_ctrt} %)`}</div>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}
