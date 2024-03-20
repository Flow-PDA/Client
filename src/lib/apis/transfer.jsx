import instance from "./base";

// 이체 내역
export async function fetchTransferList(partyKey) {
  const response = await instance.get(`/transfers/${partyKey}`);

  return response.data.result;
}

//최근 보낸 계좌
export async function fetchRecentAccountList(partyKey) {
  const response = await instance.get(`/transfers/${partyKey}/recents`);
  return response.data.result;
}

export default {
  fetchTransferList,
};
