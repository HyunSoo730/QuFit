import { END_POINT } from '@apis/ApiConstants';
import { signup } from '@apis/auth/AuthApi';
import { putMemberInfo, postProfile } from '@apis/auth/MemberApi';
import { instance } from '@apis/axios';
import { MemberInfoDTO } from '@apis/types/request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const registMember = () =>
    useMutation({
        mutationFn: ({ data, token }: { data: MemberInfoDTO; token: string }) => signup(data, token),
        onSuccess: () => {
            console.log('성공');
        },
        onError: (error) => {
            // 요청에 에러가 발생된 경우
            console.log('onError', error);
        },
        onSettled: () => {
            // 요청이 성공하든, 에러가 발생되든 실행하고 싶은 경우
            console.log('onSettled');
        },
    });

export const updateMemberInfoMutation = () => {
    return useMutation({
        mutationFn: (data: MemberInfoDTO) => putMemberInfo(data),
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
};

export const useMemberQuery = () =>
    useQuery({
        queryKey: ['member'],
        queryFn: () => instance.get(END_POINT.MEMBER),
    });

export const useProfileMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => postProfile(),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['member'] });
        },

        onError: (error) => {
            console.log('onError', error);
        },
        onSettled: () => {
            console.log('onSettled');
        },
    });
};
