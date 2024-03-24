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
export default {
  fetchPartyInfo,
  fetchPartyCreate,
  fetchPartyInquire,
};
