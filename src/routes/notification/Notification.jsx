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
import { useSelector } from "react-redux";

export default function Notification() {
  const [notis, setNotis] = useState([]);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  function timeAgo(createdAt) {
    const now = new Date();
    const updatedTime = new Date(createdAt);

    const secondsPast = (now.getTime() - updatedTime.getTime()) / 1000;

    if (secondsPast < 60) {
      return parseInt(secondsPast) + "초 전";
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + "분 전";
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + "시간 전";
    }
    if (secondsPast > 86400) {
      let month = (updatedTime.getMonth() + 1).toString();
      let date = updatedTime.getDate().toString();
      let hours = updatedTime.getHours().toString();
      let minutes = updatedTime.getMinutes().toString();

      month = month.length < 2 ? "0" + month : month;
      date = date.length < 2 ? "0" + date : date;
      hours = hours.length < 2 ? "0" + hours : hours;
      minutes = minutes.length < 2 ? "0" + minutes : minutes;

      return `${month}/${date} ${hours}:${minutes}`;
    }
  }

  const AllNoti = async () => {
    try {
      const response = await fetchAllNoti();
      setNotis(response);
    } catch (err) {
      console.error(err);
    }
  };

  const DelNoti = async (notificationKey) => {
    try {
      const response = await fetchDelNoti(notificationKey);
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
      AllNoti();
    } catch (err) {
      console.error(err);
    }
  };

  const ReadAllNoti = async () => {
    try {
      const response = await fetchReadAllNoti();
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
      <TopNavigationBar text={`${userInfo.name}님의 알림`}></TopNavigationBar>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "#818181",
            fontSize: "0.9rem",
            marginRight: "3vw",
          }}
        >
          <div
            onClick={() => {
              ReadAllNoti();
            }}
          >
            모두 읽기&ensp;&ensp;
          </div>
          <div>모두 삭제</div>
        </div>

        <div className="noti-container">
          {notis.map((noti) => (
            <div
              key={noti.notificationKey}
              className={
                noti.isViewed === true ? "white-background" : "gray-background"
              }
              style={{ margin: "1vw", padding: "3vw" }}
            >
              <div className="noti-img-container">
                <img
                  src={Speaker}
                  alt="speaker"
                  style={{
                    width: "1.2rem",
                    height: "1.2rem",
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
                  style={{
                    fontWeight: "500",
                    fontSize: "1rem",
                    width: "90%",
                    marginBottom: "0.3vh",
                  }}
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
                  style={{ color: "#818181" }}
                  onClick={() => {
                    ReadNoti(noti.notificationKey);
                    if (noti.type === 3) {
                      navigate(`/transfer/${noti.partyKey}`);
                    } else if (noti.type === 1) {
                      navigate(`/interests/${noti.partyKey}`);
                    }
                  }}
                >
                  <span style={{ fontSize: "0.9rem", marginLeft: "7vw" }}>
                    {timeAgo(noti.createdAt)}
                  </span>
                </div>
                <div
                  style={{
                    color: "#818181",
                    cursor: "pointer",
                    fontSize: "0.9rem",
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
      </Container>
    </>
  );
}
