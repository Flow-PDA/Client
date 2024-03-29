import { authInstance } from "./base";
import { fetchPartyInfo } from "./party";

// 특정 보유 주식 찾기 ex) 삼성전자
export async function fetchHankookStockBalance(partyKey, stockKey) {
  try {
    const response = await authInstance.get(`/stocks/${partyKey}/balance`);
    const data = response.data;
    const refinedRes = data.find((item) => item.pdno === stockKey);
    return refinedRes || undefined; // 조건에 맞는 데이터가 없는 경우 빈 객체 반환
  } catch (error) {
    console.error("Error fetching stock balance:", error);
    throw error;
  }
}

// 보유하고 있는 모든 주식 찾기
export async function fetchHankookStockBalanceAll(partyKey) {
  try {
    const response = await authInstance.get(`/stocks/${partyKey}/balance`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching all stock balance:", error);
    throw error;
  }
}

// 한투에서 주식 현재가 불러오는  API
export async function fetchHankookStockCurrent(stockKey) {
  try {
    const response = await authInstance.get(
      `/stocks/inquire?stock_code=${stockKey}`
    );
    console.log("fetchHankookStockCurrent", stockKey);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock balance:", error);
    throw error;
  }
}

// transactionType이 0 : 매수 / 1:매도
export async function tradeStock(
  transactionType,
  partyKey,
  stockKey,
  orderQuantity,
  orderPrice
) {
  try {
    let tr_id = "VTTC0802U"; //매수
    const party = await fetchPartyInfo(partyKey);

    if (transactionType === 1) {
      tr_id = "VTTC0801U";
    }

    const response = await authInstance.post(`/stocks/orderStock`, {
      tr_id,
      CANO: party.accountNumber,
      ACNT_PRDT_CD: "01", // 계좌뒤 2자리 아무거나 넣어도 돼서 암거나 넣음
      PDNO: stockKey,
      ORD_DVSN: "00", // 주문구분 00: 지정가
      ORD_QTY: orderQuantity, // 주문량
      ORD_UNPR: orderPrice,
      partyKey: partyKey,
      stockKey: stockKey,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 503) {
      console.log(error.response.data.msg1);
    } else {
      console.log(error);
    }
  }
}
