import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 500) {
      // console.error("서버 에러 발생");
    }
    return Promise.reject(error);
  }
);

export default instance;
