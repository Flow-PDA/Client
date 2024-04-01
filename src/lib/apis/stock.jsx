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
    // console.log(stock_name);
    // console.log(response);
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
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

//DB에서 주식 정보 가져오기
export async function fetchEachStockDataFromDB(stockKey) {
  try {
    const response = await authInstance.get(`stocks/stockInfo/${stockKey}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// party 페이지 예수금 계산, 비율 계산(실제 계좌 필요)
export async function fetchDepositData(CANO, APPKEY, APPSECRET, TOKEN) {
  try {
    const response = await authInstance.post(`stocks/inquireDeposit`, {
      CANO,
      APPKEY,
      APPSECRET,
      TOKEN,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
}

// 가지고 있는 주식 정보
export async function fetchHavingStock(partyKey) {
  try {
    const response = await authInstance.get(`stocks/${partyKey}/balance`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

//주식 전일 종가 가져오기
export async function fetchStockEndPrice(stockKey) {
  const response = await authInstance.get(
    `/stocks/stockInfo/${stockKey}/endPrice`
  );

  // console.log("aa", response.data.result);

  return response.data.result;
}
export default {
  fetchStockInfo,
  fetchNewsData,
  fetchStockData,
  fetchDepositData,
  fetchHavingStock,
  fetchStockEndPrice,
};
