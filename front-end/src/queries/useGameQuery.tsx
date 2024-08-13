import { getGameResult, postGameResult } from '@apis/GameApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGameQuery = () =>
    useQuery({
        queryKey: ['gameResult'],
        queryFn: () => getGameResult(),
    });

export const useRegistGameResultMutation = () =>
    useMutation({
        mutationFn: () => postGameResult(),
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
