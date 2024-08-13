import { create } from 'zustand';

interface ChatInfoListProps {
    chatRoomId: number;
    otherMemberNickname: string;
    profileImage: string;
    otherMemberId: number;
    lastMessage: string;
    unreadCount: number;
    lastMessageId?: string;
    lastMessageTime?: string;
    lastReadMessageId?: string;
}

interface ChatInfoListStoreProps {
    chatInfoList: ChatInfoListProps[];
    setChatInfoList: (list: ChatInfoListProps[]) => void;
}

const useChatInfoListStore = create<ChatInfoListStoreProps>((set) => ({
    chatInfoList: [],
    setChatInfoList: (list: ChatInfoListProps[]) => set(() => ({ chatInfoList: list })),
}));

export const useChatInfoList = () => useChatInfoListStore((state) => state.chatInfoList);
export const useSetChatInfoList = () => useChatInfoListStore((state) => state.setChatInfoList);
