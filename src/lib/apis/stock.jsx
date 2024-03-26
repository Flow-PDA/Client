import { authInstance } from "./base";

// 주식 코드로 주식 정보 조회
export async function fetchStockInfo(stockKey) {
  try {
    const response = await authInstance.get(
      `/stocks/inquire?stock_code=${stockKey}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
}

export async function fetchNewsData(stock_name) {
  try {
    const response = await authInstance.get(
      `/stocks/news?stock_name=${stock_name}`
    );
    console.log(stock_name);
    console.log(response);
    return response;
  } catch (err) {
    console.error(error);
  }
}

export default {
  fetchStockInfo,
  fetchNewsData,
};
