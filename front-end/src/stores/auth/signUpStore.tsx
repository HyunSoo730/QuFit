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
            setAccessToken: (accessToken) => set({ accessToken: accessToken }),
        }),
        { name: 'accessToken', storage: createJSONStorage(() => localStorage) },
    ),
);

export const useAccessTokenStore = () => useSignUpStore((state) => state.accessToken);
export const useSetAccessTokenStore = () => useSignUpStore((state) => state.setAccessToken);
