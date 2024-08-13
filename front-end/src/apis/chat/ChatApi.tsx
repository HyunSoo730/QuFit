import { END_POINT } from '@apis/ApiConstants';
import { instance } from '@apis/axios';
import { useMutation, useQuery } from '@tanstack/react-query';

// 친구 목록 가져오기
export const getChat = async (page: number, size: number) => {
  return await instance.get(END_POINT.FRIEND, { params: { page, size } });
};

// 친구 삭제하기
export const deleteFriend = async (friendId: number) => {
  return await instance.delete(`${END_POINT.FRIEND}/${friendId}`);
};
