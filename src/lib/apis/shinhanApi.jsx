import { authInstance } from "./base";

// 투자전략
export async function fetchShinhanInvest() {
  const response = await authInstance.get(`/stocks/investStrategy`);
  return response.data;
}

// 마켓 이슈
export async function fetchShinhanMarket() {
  const response = await authInstance.get(`/stocks/marketIssue`);
  return response.data;
}

// 실시간 뜨는 종목
export async function fetchShinhanRising() {
  const response = await authInstance.get(`/stocks/hotTheme`);
  return response.data;
}

export default {
  fetchShinhanInvest,
  fetchShinhanMarket,
  fetchShinhanRising,
};
