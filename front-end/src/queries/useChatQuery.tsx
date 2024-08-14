import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFriend, deleteFriend, postFriend, getChat } from '@apis/chat/ChatApi';
import { FriendListResponse } from '@apis/types/response';
import { useState } from 'react';

// React Query로 친구 목록 가져오기
export const useFriendListQuery = (page: number, size: number) => {
    const [refetch, setFefetch] = useState(true);

    return useQuery<FriendListResponse, Error>({
        queryKey: ['friendList', page, size],
        queryFn: () =>
            getFriend(page, size)
                .then((response) => response.data)
                .catch(() => setFefetch(false)),
        enabled: refetch,
    });
};

// 친구를 삭제하는 React Query 훅
// 전체 친구 목록을 다시 가져오도록 트리거한다고 이해함.
export const useDeleteFriendMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (friendId: number) => deleteFriend(friendId),
        onSuccess: () => {
            // 페이지나 사이즈에 관계없이 모든 friendList 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['friendList'] });
        },
        onError: (error) => {
            console.error('친구 삭제 실패:', error);
        },
    });
};

export const usePostFriendMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (friendId: number) => postFriend(friendId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendList'] });
        },
        onError: (error) => {
            console.error('친구 추가 실패:', error);
        },
    });
};

export const useChatListQuery = (memberId: number) =>
    useQuery({
        queryKey: ['chatList'],
        queryFn: () => getChat(memberId),
    });
