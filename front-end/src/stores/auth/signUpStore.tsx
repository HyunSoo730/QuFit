import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
    accessToken: string | undefined;
}

interface Action {
    setAccessToken: (accessToken: string | undefined) => void;
}

const useSignUpStore = create(
    persist<State & Action>(
        (set) => ({
            accessToken: '',
            setAccessToken: (kakaoAccessToken) => set({ accessToken: kakaoAccessToken }),
        }),
        { name: 'accessToken', storage: createJSONStorage(() => localStorage) },
    ),
);

export const useKaKaoAccessTokenStore = () => useSignUpStore((state) => state.accessToken);
export const useSetKaKaoAccessTokenStore = () => useSignUpStore((state) => state.setAccessToken);
