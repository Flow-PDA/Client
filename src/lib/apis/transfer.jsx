import instance from "./base";

// 이체 내역
export async function fetchTransferList(partyKey) {
  const response = await instance.get(`/transfers/${partyKey}`);

  return response.data.result;
}

//최근 보낸 계좌
export async function fetchRecentAccountList(partyKey) {
  const response = await instance.get(`/transfers/${partyKey}/recents`);
  return response.data.result;
}

// export async function fetchBoardDetail(boardType, boardId) {
//   const response = await instance.get(`/${boardType}/${boardId}`);
//   return response;
// }

// export async function fetchBoardWrite(boardType, newBoardData) {
//   const response = await instance.post(`/${boardType}`, newBoardData);
//   return response;
// }

// export async function fetchBoardEdit(boardType, boardId, newBoardData) {
//   const response = await instance.put(
//     `/${boardType}/${boardId}/edit`,
//     newBoardData
//   );
//   return response.data;
// }

// export async function fetchBoardDelete(boardType, boardId) {
//   const response = await instance.delete(`/${boardType}/${boardId}`);
//   return response.data;
// }

// // 댓글
// // TODO
// export async function fetchBoardCommentList(boardType, boardId) {
//   const response = await instance.get(`/${boardType}/${boardId}/comment`);
//   return response;
// }

// export async function fetchBoardCommentWrite(boardType, boardId, commentData) {
//   const response = await instance.post(
//     `/${boardType}/${boardId}/comment`,
//     commentData
//   );
//   return response.data;
// }

// export async function fetchBoardCommentDelete(boardType, boardId, commentId) {
//   const response = await instance.delete(
//     `/${boardType}/${boardId}/comment/${commentId}`
//   );
//   return response.data;
// }

// //대댓글
// export async function fetchBoardCommentReplyWrite(
//   boardType,
//   boardId,
//   commentId,
//   commentReplyData
// ) {
//   const response = await instance.post(
//     `/${boardType}/${boardId}/comment/${commentId}`,
//     commentReplyData
//   );
//   return response.data;
// }

// export async function fetchBoardCommentReplyDelete(
//   boardType,
//   boardId,
//   commentId,
//   commentReplyId
// ) {
//   const response = await instance.delete(
//     `/${boardType}/${boardId}/comment/${commentId}/commentReply/${commentReplyId}`
//   );
//   return response.data;
// }

// export async function fetchMypageBoardList(userId) {
//   const response = await instance.get(`users/${userId}/boards`);

//   console.log(response);
//   return response;
// }

export default {
  fetchTransferList,
  //   fetchBoardDetail,
  //   fetchBoardWrite,
  //   fetchBoardEdit,
  //   fetchBoardDelete,
  //   fetchBoardCommentList,
  //   fetchBoardCommentWrite,
  //   fetchBoardCommentDelete,
  //   fetchBoardCommentReplyWrite,
  //   fetchBoardCommentReplyDelete,
  //   fetchMypageBoardList,
};
