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

// 뉴스 크롤링
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

// DB에서 전 종목 불러오기
export async function fetchStockData() {
  try {
    const response = await authInstance.get("stocks/all");
    console.log(response);
    return response.data
  } catch (err) {
    console.error(err);
  }
}
export default {
  fetchStockInfo,
  fetchNewsData,
  fetchStockData,
};
