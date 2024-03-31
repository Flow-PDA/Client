import React, { useState, useEffect } from "react";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import notification, {
  fetchAllNoti,
  fetchDelNoti,
  fetchReadNoti,
  fetchReadAllNoti,
  fetchNotReadNoti,
} from "../../lib/apis/notification";
import "./Notification.css";
import Speaker from "../../assets/speakerphone.png";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const [notis, setNotis] = useState([]);
  const navigate = useNavigate();
  const AllNoti = async () => {
    try {
      const response = await fetchAllNoti();
      console.log(response);
      setNotis(response);
    } catch (err) {
      console.error(err);
    }
  };

  const DelNoti = async (notificationKey) => {
    try {
      const response = await fetchDelNoti(notificationKey);
      console.log(response);
      const updatedNotis = notis.filter(
        (noti) => noti.notificationKey !== notificationKey
      );
      setNotis(updatedNotis);
    } catch (err) {
      console.error(err);
    }
  };

  const ReadNoti = async (notificationKey) => {
    try {
      const response = await fetchReadNoti(notificationKey);
      console.log(response);
      AllNoti();
    } catch (err) {
      console.error(err);
    }
  };

  const ReadAllNoti = async () => {
    try {
      const response = await fetchReadAllNoti();
      console.log(response);
      AllNoti();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    AllNoti();
  }, []);
  return (
    <>
      <TopNavigationBar text="정찬진님의 알림"></TopNavigationBar>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          color: "#818181",
        }}
      >
        <div
          onClick={() => {
            ReadAllNoti();
          }}
        >
          모두 읽기&ensp;&ensp;
        </div>
        <div style={{ marginRight: "3.6rem" }}>모두 삭제</div>
      </div>

      <div className="noti-container">
        {notis.map((noti) => (
          <div
            key={noti.notificationKey}
            className={
              noti.isViewed === true ? "white-background" : "gray-background"
            }
          >
            <div className="noti-img-container">
              <img
                src={Speaker}
                alt="speaker"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  marginLeft: "1rem",
                }}
                onClick={() => {
                  ReadNoti(noti.notificationKey);
                  if (noti.type === 3) {
                    navigate(`/transfer/${noti.partyKey}`);
                  } else if (noti.type === 1) {
                    navigate(`/interests/${noti.partyKey}`);
                  }
                }}
              />
              <div
                style={{ fontWeight: "500", fontSize: "0.9rem", width: "90%" }}
                onClick={() => {
                  ReadNoti(noti.notificationKey);
                  if (noti.type === 3) {
                    navigate(`/transfer/${noti.partyKey}`);
                  } else if (noti.type === 1) {
                    navigate(`/interests/${noti.partyKey}`);
                  }
                }}
              >
                {noti.content}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{ marginLeft: "3.6rem", color: "#818181" }}
                onClick={() => {
                  ReadNoti(noti.notificationKey);
                  if (noti.type === 3) {
                    navigate(`/transfer/${noti.partyKey}`);
                  } else if (noti.type === 1) {
                    navigate(`/interests/${noti.partyKey}`);
                  }
                }}
              >
                {noti.createdAt.slice(5, 10)}&ensp;
                {noti.createdAt.slice(11, 16)}
              </div>
              <div
                style={{
                  marginRight: "4rem",
                  color: "#818181",
                  cursor: "pointer",
                }}
                onClick={() => {
                  DelNoti(noti.notificationKey);
                }}
              >
                삭제
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
