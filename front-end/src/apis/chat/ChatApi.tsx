import { END_POINT } from '@apis/ApiConstants';
import { instance } from '@apis/axios';

// 친구
export const getFriend = async (page: number, size: number) => {
    return await instance.get(END_POINT.FRIEND, { params: { page, size } });
};

export const deleteFriend = async (friendId: number) => {
    return await instance.delete(`${END_POINT.FRIEND}/${friendId}`);
};

export const postFriend = async (friendId: number) => {
    return await instance.post(END_POINT.FRIEND, friendId);
};

// 채팅
export const getChat = async (memberId: number) => {
    return await instance.get(`${END_POINT.CHAT}/${memberId}`);
};
