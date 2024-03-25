import { authInstance } from "./base";

// 주식 코드로 주식 정보 조회
export async function fetchStockInfo(stockKey) {
  try {
    const response = await authInstance.get(`/stocks/stockInfo/${stockKey}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
}
