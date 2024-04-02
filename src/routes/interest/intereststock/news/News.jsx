import React, { useState, useEffect, useContext } from "react";
import "./News.css";
import { useNavigate } from "react-router-dom";
import { fetchNewsData } from "../../../../lib/apis/stock";
import { AuthContext } from "../../../../lib/contexts/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
export default function News({ news, setNews, stockName }) {
  const { throwAuthError } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetchNewsData(stockName);
      setNews(response.data);
      console.log(response.data);
      return response.data;
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
      <div className="news-container">
        {news.map((elem, index) => (
          <>
            <div
              className="news-data-container"
              key={index}
              onClick={() => (window.location.href = `${elem.news_link}`)}
            >
              <div className="news-content">
                <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  {elem.news_title.slice(0, 15)}..
                </div>
                <div>{elem.news_content.slice(0, 45)}..</div>
              </div>
              <div
                style={{
                  width: "25vw",
                  height: "10vh",
                  backgroundSize: "cover",
                  backgroundImage: `url(${elem.news_img})`,
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
