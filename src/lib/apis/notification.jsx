import instance from "./base";
import { authInstance } from "./base";

// 유저별 전체 알림
export async function fetchAllNoti() {
  const response = await authInstance.get(`/notices/allnoti`);
  return response.data.result;
}
// 읽은 알림 삭제
export async function fetchDelNoti(notificationKey) {
  const response = await authInstance.delete(
    `/notices/${notificationKey}/delete`
  );
  return response.data.result;
}
// 알림 읽기
export async function fetchReadNoti(notificationKey) {
  const response = await authInstance.put(`/notices`, { notificationKey });
  return response;
}
// 전체 읽기
export async function fetchReadAllNoti() {
  const response = await authInstance.put(`/notices/readAll`);
  return response;
}
// 안 읽은 알림 갯수 확인
export async function fetchNotReadNoti() {
  const response = await authInstance.get(`/notices/checkunread`);
  return response.data;
}
export default {
  fetchAllNoti,
  fetchDelNoti,
  fetchReadNoti,
  fetchReadAllNoti,
};
