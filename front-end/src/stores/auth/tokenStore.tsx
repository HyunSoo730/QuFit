import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
    accessToken: string | undefined;
}

interface Action {
    setAccessToken: (accessToken: string | undefined) => void;
}

const useTokenStore = create(
    persist<State & Action>(
        (set) => ({
            accessToken: '',
            setAccessToken: (accessToken) => {
                // Bearer 제거
                const token = accessToken?.startsWith('Bearer ') ? accessToken.slice(7) : accessToken;
                set({ accessToken: token });
            },
        }),
        { name: 'accessToken', storage: createJSONStorage(() => localStorage) },
    ),
);

export const useAccessTokenStore = () => useTokenStore((state) => state.accessToken);
export const useSetAccessTokenStore = () => useTokenStore((state) => state.setAccessToken);

