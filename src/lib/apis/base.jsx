import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 500) {
      // console.error("서버 에러 발생");
    }
    return Promise.reject(error);
  }
);

export default instance;
