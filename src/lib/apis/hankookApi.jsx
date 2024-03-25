import { authInstance } from "./base";

// 특정 보유 주식 찾기 ex) 삼성전자
export async function fetchHankookStockBalance(partyKey, stockKey) {
  try {
    const response = await authInstance.get(
      `/stocks/${partyKey}/${stockKey}/balance`
    );
    const data = response.data;
    const refinedRes = data.find((item) => item.pdno === stockKey);
    return refinedRes || undefined; // 조건에 맞는 데이터가 없는 경우 빈 객체 반환
  } catch (error) {
    console.error("Error fetching stock balance:", error);
    throw error;
  }
}

// 한투에서 주식 현재가 불러오는  API
export async function fetchHankookStockCurrent(stockKey) {
  try {
    const response = await authInstance.get(
      `/stocks/inquire?stock_code=${stockKey}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching stock balance:", error);
    throw error;
  }
}
