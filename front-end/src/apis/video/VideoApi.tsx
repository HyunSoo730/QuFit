import { END_POINT } from '@apis/ApiConstants';
import { instance } from '@apis/axios';
import { VideoRoomRequest } from '@apis/types/request';
import { useMutation, useQuery } from '@tanstack/react-query';

export const getVideo = async (page: number, size: number, statusType: number) => {
    return await instance.get(END_POINT.VIDEO, { params: { page: page, size: size, statusType: statusType } });
};

export const postVideo = async (videoRoom: VideoRoomRequest) => {
    return await instance.post(END_POINT.VIDEO, videoRoom);
};

export const getVideoDetail = async (videoRoomId: number) => {
    return await instance.get(END_POINT.VIDEO_DETAIL(videoRoomId));
};

export const putVideoDetail = async (videoRoomId: number, videoRoom: VideoRoomRequest) => {
    return await instance.put(END_POINT.VIDEO_DETAIL(videoRoomId), videoRoom);
};

export const deleteVideoDetail = async (videoRoomId: number) => {
    return await instance.delete(END_POINT.VIDEO_DETAIL(videoRoomId));
};

export const postVideoJoin = async (videoRoomId: number) => {
    return await instance.post(END_POINT.VIDEO_JOIN(videoRoomId));
};

export const deleteVideoLeave = async (videoRoomId: number) => {
    return await instance.delete(END_POINT.VIDEO_LEAVE(videoRoomId));
};

export const getVideoFilter = async (page: number, size: number, tagIds: number[]) => {
    return await instance.get(END_POINT.VIDEO_FILTER, { params: { page: page, size: size, tagIds: tagIds } });
};

export const getVideoRecommendation = async (page: number) => {
    return await instance.get(END_POINT.VIDEO_RECOMMENDATION, { params: { page: page } });
};

export const useBalanceGameQuery = () =>
    useQuery({
        queryKey: ['balanceGame'],
        queryFn: () => instance.get('/qufit/balance-game/random'),
    });

interface RegistChoiceMutationParams {
    balanceGameId: number;
    videoRoomId: number;
    choiceNum: 1 | 2 | 0;
}

export const useRegistChoiceMutation = () =>
    useMutation({
        mutationFn: (data: RegistChoiceMutationParams) => instance.post('/qufit/balance-game', data),
        onSuccess: () => {
            console.log('성공');
        },
        onError: (error) => {
            console.log('onError', error);
        },
        onSettled: () => {
            console.log('onSettled');
        },
    });

export const useBalanceGameResultQuery = (video_room_id: number) =>
    useQuery({
        queryKey: ['balanceGameResult', video_room_id],
        queryFn: () => instance.get(`/qufit/balance-game/${video_room_id}`),
    });
