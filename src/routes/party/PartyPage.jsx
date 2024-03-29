import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import "./PartyPage.css";
import { modifyTest } from "../../lib/apis/userApi";
import { AuthContext } from "../../lib/contexts/AuthContext";
import {
  fetchUser,
  fetchPartyInfo,
  fetchPartyMemberInquire,
  fetchSearchUser,
  fetchNormalUser,
} from "../../lib/apis/party";
import { fetchDepositData } from "../../lib/apis/stock";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../../assets/alert.png";
import { deletePartyKey } from "../../store/reducers/partyReducer";
// 특정 모임 정보 api
// 잔고 api

export default function PartyPage() {
  const [infos, setInfos] = useState([]);
  const [check, setCheck] = useState(0);
  const [admin, setAdmin] = useState("");
  const [count, setCount] = useState(0);
  const [adminKey, setAdminKey] = useState(0);
  const [partyName, setPartyName] = useState("");
  const { throwAuthError } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const partyKey = useSelector((state) => state.party.partyKey.partyKey);
  const userKey = useSelector((state) => state.user.userInfo.userKey);
  console.log(typeof partyKey);
  console.log(userKey);
  // const test = useCallback(async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await modifyTest(2);
  //     // console.log(res);
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       console.log("throws");
  //       throwAuthError();
  //     }
  //   }
  // }, []);
  const fetchData = async () => {
    try {
      // const temps = await fetchPartyInquire();
      const resp = await fetchUser(userKey);
      console.log(resp);
      const party = resp.map((resp) => {
        const tbody = { partyKey: resp.partyKey };
        return tbody;
      });
      // console.log(resp.data.groups); //유저가 속한 파티 조회
      // const party = resp.data.groups;
      const resBody = await Promise.all(
        party.map(async (elem) => {
          const alpha = await fetchPartyInfo(elem.partyKey);
          return alpha;
        })
      );
      console.log(resBody);
      const new_tmp = await Promise.all(
        resBody.map(async (party) => {
          const {
            accountNumber: CANO,
            token: TOKEN,
            appSecret: APPSECRET,
            appKey: APPKEY,
          } = party;
          const res = await fetchDepositData(CANO, APPKEY, APPSECRET, TOKEN);
          return { ...party, ...res };
        })
      );
      console.log(new_tmp);
      setInfos(new_tmp);
      // console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const PartyClick = (partyKey) => {
    navigate(`/party/${partyKey}/myparty`);
  };

  const CheckInvite = async () => {
    try {
      const response = await fetchPartyMemberInquire(partyKey);
      console.log(response);
      response.map(async (elem) => {
        if (elem.userKey === userKey) {
          // setCount(count+1)
          setCheck(1);
          console.log(check);
        }
        //1이면 보여준다, 0이면 안보여준다.
        if (elem.role === 1) {
          const adminKey = elem.userKey;
          console.log(adminKey);
          console.log(partyKey);
          const resp = await fetchSearchUser(partyKey, adminKey);
          console.log(resp);
          setAdmin(resp.data.userName);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  const FindParty = async () => {
    try {
      const response = await fetchPartyInfo(partyKey);
      console.log(response);
      setPartyName(response.name);
    } catch (err) {
      console.error(err);
    }
  };
  const OkParty = async () => {
    try {
      const response = await fetchNormalUser(partyKey);
      console.log(response);
      dispatch(deletePartyKey());
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  const NoParty = () => {
    dispatch(deletePartyKey());
  };
  useEffect(() => {
    fetchData();
    CheckInvite();
    FindParty();
    // FindUser();
    // fetchDeposit();
  }, [partyKey]);
  console.log(partyKey);
  return (
    <>
      {/* <button onClick={test}>test</button> */}
      <TopNavigationBar text="모임 생성"></TopNavigationBar>
      <Container className="page-container">
        <div className="party-container">
          <div
            className={
              partyKey === "null"
                ? "alert-none"
                : partyKey != "null" && check === 1
                ? "alert-none"
                : // : partyKey&& check === 0
                  "alert-container"
              // : "alert-none"
            }
          >
            <img src={Alert} alt="alert" />
            <div className="message-container">
              <p className="alert-message main-font">{partyName}의 초대</p>
              <p className="alert-message sub-font">
                {admin}님이 초대했습니다.
              </p>
            </div>
            <div className="alert-button-container">
              <Button
                onClick={OkParty}
                variant="primary"
                style={{ backgroundColor: "#375AFF" }}
              >
                Y{/* 버튼을 누르면 파티로 멤버 초대 */}
                {/* delete로 dispatch */}
              </Button>
              <Button onClick={NoParty} variant="danger">
                N
              </Button>
              {/* delete로 dispatch */}
            </div>
          </div>
          {infos.map((party) => (
            <div className="deposit-container" key={party.partyKey}>
              <div
                onClick={() => {
                  PartyClick(party.partyKey);
                }}
                className="deposit-info-container"
              >
                <h3>
                  <span style={{ fontWeight: "700" }}>{party.name}</span>의 모임
                  투자
                </h3>
                <h1 style={{ padding: "0" }}>
                  {(
                    Number(party.evlu_amt_smtl_amt) + Number(party.deposit)
                  ).toLocaleString()}
                  원
                </h1>
                <h3
                  className={
                    party.evlu_amt_smtl_amt - party.pchs_amt_smtl_amt >= 0
                      ? "red-txt"
                      : "blue-txt"
                  }
                >
                  {Number(party.evlu_amt_smtl_amt) !== 0 &&
                  Number(party.pchs_amt_smtl_amt) !== 0 ? (
                    <>
                      {(
                        party.evlu_amt_smtl_amt - party.pchs_amt_smtl_amt
                      ).toLocaleString()}
                      원 (
                      {(
                        ((party.evlu_amt_smtl_amt - party.pchs_amt_smtl_amt) /
                          party.pchs_amt_smtl_amt) *
                        100
                      ).toFixed(2)}
                      %)
                    </>
                  ) : (
                    <>0(0%)</>
                  )}
                </h3>
              </div>

              <div className="deposit-button-container">
                <Link to={`/livestock/${party.partyKey}`}>
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "#375AFF" }}
                  >
                    투자
                  </Button>
                </Link>
                <Link to={`/transfer/${party.partyKey}`}>
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "#375AFF" }}
                  >
                    이체
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          <Link to={"/party/create"}>
            <Button
              style={{
                backgroundColor: "#f8f6f6",
                color: "#000",
                fontSize: "2rem",
                border: "none",
                width: "90vw",
              }}
            >
              +
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
