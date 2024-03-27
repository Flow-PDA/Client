import instance from "./base";
import { authInstance } from "./base";

// 이체 내역
export async function fetchTransferList(partyKey) {
  const response = await authInstance.get(`/transfers/${partyKey}`);

  return response.data.result;
}

//최근 보낸 계좌
export async function fetchRecentAccountList(partyKey) {
  const response = await authInstance.get(`/transfers/${partyKey}/recents`);
  return response.data.result;
}

//이체하기
// @param {*} reqBody required : partyKey, name, accountNumber, price
export async function transfer({ reqBody, partyKey }) {
  console.log(reqBody);
  const response = await authInstance.post(`/transfers/${partyKey}`, reqBody);
  return response;
}

export default {
  fetchTransferList,
  fetchRecentAccountList,
  transfer,
};
