import { signup } from '@apis/auth/AuthApi';
import { MemberInfoDTO } from '@apis/types/request';
import { useMutation } from '@tanstack/react-query';

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
