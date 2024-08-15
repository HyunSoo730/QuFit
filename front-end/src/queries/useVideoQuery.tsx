import { VideoRoomRequest } from '@apis/types/request';
import {
    deleteVideoDetail,
    deleteVideoLeave,
    getVideo,
    getVideoDetail,
    getVideoFilter,
    getVideoRecommendation,
    postVideo,
    postVideoJoin,
    putVideoDetail,
} from '@apis/video/VideoApi';
import { useMutation, useQuery } from '@tanstack/react-query';

// 비디오 방 목록 조회
export const useVideoRoomQuery = (page: number, size: number, statusType: number) =>
    useQuery({
        queryKey: ['videoRoom', { page, size, statusType }],
        queryFn: () => getVideo(page, size, statusType),
    });

// 새 비디오 방 생성
export const useCreateVideoRoomMutation = () =>
    useMutation({
        mutationFn: (data: VideoRoomRequest) => postVideo(data),
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

// 비디오 방 상세 정보 조회 
export const useVideoRoomDetailQuery = (videoRoomId: number | null) =>
    useQuery({
        queryKey: ['videoRoomDetail', videoRoomId],
        queryFn: () => {
            if (videoRoomId === null) {
                throw new Error('Invalid videoRoomId');
            }
            return getVideoDetail(videoRoomId);
        },
        enabled: !!videoRoomId,
    });

// 비디오 방 업데이트
export const useUpdateVideoRoomMutation = () =>
    useMutation({
        mutationFn: ({ videoRoomId, videoRoomRequest }: { videoRoomId: number; videoRoomRequest: VideoRoomRequest }) =>
            putVideoDetail(videoRoomId, videoRoomRequest),
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

// 비디오 방 삭제
export const useRemoveVideoRoomMutation = () =>
    useMutation({
        mutationFn: (videoRoomId: number) => deleteVideoDetail(videoRoomId),
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

//비디오 방 참여
export const useJoinVideoRoomMutation = () =>
    useMutation({
        mutationFn: (videoRoomId: number) => postVideoJoin(videoRoomId),

        onError: (error) => {
            console.log('onError', error);
        },
        onSettled: () => {
            console.log('onSettled');
        },
    });

//비디오 방 퇴장
export const useLeaveVideoRoomMutation = () =>
    useMutation({
        mutationFn: (videoRoomId: number) => deleteVideoLeave(videoRoomId),
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

//필터된 비디오 방 목록 조회
export const useFilteredVideoRoomQuery = (page: number, size: number, tagIds: number[]) =>
    useQuery({
        queryKey: ['filteredVideoRoom', page, size, tagIds],
        queryFn: () => getVideoFilter(page, size, tagIds),
    });

//추천받은 방 목록 조회
export const useRecommendedVideoRoomQuery = (page: number) =>
    useQuery({
        queryKey: ['recommendedVideoRoom', page],
        queryFn: () => getVideoRecommendation(page),
    });
