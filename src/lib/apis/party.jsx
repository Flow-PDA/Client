import instance from "./base";

// 모임 정보 조회
export async function fetchPartyInfo(partyKey) {
  const response = await instance.get(`/parties/${partyKey}`);

  return response.data.result;
}

export default {
  fetchPartyInfo,
};
