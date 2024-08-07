// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';

// interface State {
//     member: string | undefined;
// }

// interface Action {
//     setMember: (accessToken: string | undefined) => void;
// }

// const useMemberStore = create(
//     persist<State & Action>(
//         (set) => ({
//             accessToken: '',
//             setAccessToken: (accessToken) => set({ accessToken: accessToken }),
//         }),
//         { name: 'accessToken', storage: createJSONStorage(() => localStorage) },
//     ),
// );

// export const useAccessTokenStore = () => useSignUpStore((state) => state.accessToken);
// export const useSetAccessTokenStore = () => useSignUpStore((state) => state.setAccessToken);
