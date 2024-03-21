import { authInstance } from "./base";

// [GET] get 승인 중인 관심 list
export async function getApproval(partyKey) {
  const response = await authInstance.get(`/interests/${partyKey}/approval`);
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
  return response;
}

export default {
  getApproval,
  getApproved,
  delApproved,
  vote,
};
