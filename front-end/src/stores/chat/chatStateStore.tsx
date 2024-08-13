import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfoProps {
    id: number;
    nickname: string;
    profileImage: string;
    otherMemberId: number;
}

interface ChatStateProps {
    chatState: UserInfoProps[];
    setChatState: (list: UserInfoProps[]) => void;
}

const useChatStateStore = create(
    persist<ChatStateProps>(
        (set) => ({
            chatState: [
                {
                    id: 0,
                    nickname: '',
                    profileImage: '',
                    otherMemberId: 0,
                },
            ],
            setChatState: (list: UserInfoProps[]) =>
                set(() => ({
                    chatState: list,
                })),
        }),
        { name: 'chatState', storage: createJSONStorage(() => sessionStorage) },
    ),
);

export default useChatStateStore;
