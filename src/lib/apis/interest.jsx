import { authInstance } from "./base";

// [GET] get 승인 중인 관심 list
export async function getApproval(partyKey) {
  const response = await authInstance.get(`/interests/${partyKey}/approval`);
  console.log("res", response.data.result);
  return response;
}

// [GET] get 승인된 관심 list
export async function getApproved(partyKey) {
  const response = await authInstance.get(`/interests/${partyKey}/approved`);
  return response;
}

// [DELETE] 승인된 관심 종목 빼기
export async function delApproved(partyKey, interestStockKey) {
  const response = await authInstance.delete(
    `/interests/${partyKey}/${interestStockKey}`
  );

  return response;
}

// [POST] 투표
// @param {*} reqBody required : isApproved
export async function vote(partyKey, interestStockKey, reqBody) {
  const response = await authInstance.post(
    `/interests/${partyKey}/${interestStockKey}`,
    reqBody
  );
  console.log("vote", response.data);
  return response;
}

// [POST] 관심 목록 등록
//reqBody에 stockKey, userKey, partyKey 필요
export async function regist(partyKey, reqBody) {
  const response = await authInstance.post(`interests/${partyKey}`, reqBody);
  return response;
}

export default {
  getApproval,
  getApproved,
  delApproved,
  vote,
  regist,
};
