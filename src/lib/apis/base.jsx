import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api",
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

// check if token exists
// TODO : weird approach
const persistedString = localStorage.getItem("persist:user");
const token = persistedString?.includes("accessToken")
  ? JSON.parse(JSON.parse(persistedString).userInfo).accessToken
  : "";
// console.log(token);

/**
 * axios instance with Authorization header
 */
const authInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: token !== "" ? `Bearer ${token}` : "",
  },
});

/**
 * update token of authorized axios instance
 * @param {*} token
 */
const updateToken = (token) => {
  authInstance.interceptors.request.use(function (request) {
    request.headers.Authorization = `Bearer ${token}`;

    return request;
  });
};

export { authInstance, updateToken };
export default instance;
