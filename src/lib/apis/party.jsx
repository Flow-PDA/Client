import { authInstance } from "./base";

// 모임 정보 조회
export async function fetchPartyInfo(partyKey) {
  const response = await authInstance.get(`/parties/${partyKey}`);

  return response.data.result;
}

export default {
  fetchPartyInfo,
};
