import { authInstance } from "./base";

// 모임 정보 조회
export async function fetchPartyInfo(partyKey) {
  const response = await authInstance.get(`/parties/${partyKey}`);

  return response.data.result;
}

// 모임 생성, 관리자 등록
export async function fetchPartyCreate(name, accountNumber) {
  const response = await authInstance.post(`/parties`, {
    name,
    accountNumber,
  });
  return response.data.result;
}

// 모든 모임 조회
export async function fetchPartyInquire() {
  const response = await authInstance.get(`/parties`);
  return response.data.result;
}

//모임 주식 거래 내역 조회
export async function fetchTransactionDetail(partyKey) {
  const response = await authInstance.get(
    `/stocks/${partyKey}/transactionDetail`
  );

  return response.data.result;
}

// 모임 목표 수정 및 설정
export async function fetchPartyGoal(partyKey, goal, goalPrice, goalDate) {
  const response = await authInstance.put(`/parties/${partyKey}/goals`, {
    goal,
    goalPrice,
    goalDate,
  });
  console.log(response);
  return response;
}

// 모임 관리자 확인
export async function fetchPartyAdmin(partyKey) {
  const response = await authInstance.get(`/parties/${partyKey}/admin`);
  return response;
}

// 특정 모임의 모임원 조회
export async function fetchPartyMemberInquire(partyKey) {
  const response = await authInstance.get(`/parties/${partyKey}/members`);
  return response.data.result;
}

// 유저의 정보 조회
export async function fetchSearchUser(partyKey, userKey) {
  const response = await authInstance.post(`/parties/${partyKey}/user`, {
    userKey,
  });
  console.log(response);
  return response;
}
// 일반 유저 등록하기
export async function fetchNormalUser(partyKey) {
  const response = await authInstance.post(`/parties/${partyKey}/members`, {
    partyKey,
  });
  console.log(response);
  return response;
}
// 유저 삭제하기
export async function fetchDeleteUser(partyKey, userKey) {
  console.log("11", userKey);
  const response = await authInstance.delete(
    `/parties/${partyKey}/members?userKey=${userKey}`
  );
  console.log(response);
  return response;
}
export async function fetchUser(userKey) {
  const response = await authInstance.get(`/parties/${userKey}/user`);
  return response.data.result;
}
export default {
  fetchPartyInfo,
  fetchPartyCreate,
  fetchPartyInquire,
  fetchTransactionDetail,
  fetchPartyGoal,
  fetchPartyAdmin,
  fetchPartyMemberInquire,
  fetchSearchUser,
  fetchDeleteUser,
  fetchUser,
  fetchNormalUser,
};
