import FriendInfo from '@components/chat/FriendInfo';
import ChatInfo from '@components/chat/ChatInfo';
import ChatRoom from '@components/chat/ChatRoom';
import { FriendsInfoDummy } from '@dummy/Dummy';
import useTabStateStore from '@stores/chat/tabStateStore';
import useChatStateStore from '@stores/chat/chatStateStore';
import { instance } from '@apis/axios';
import { useEffect, useState } from 'react';

interface ChatListProps {
    chatRoomId: number;
    otherMemberNickname: string;
    profileImage: string;
    otherMemberId: number;
    lastMessage: string;
    unreadCount: number;
    lastMessageId: string;
    lastMessageTime: string;
    lastReadMessageId: string;
}

const ChattingPage = () => {
    const [chatList, setChatList] = useState<ChatListProps[]>([]);

    const buttonFocus = useTabStateStore((state) => state.buttonFocus);
    const setButtonFocus = useTabStateStore((state) => state.setButtonFocus);

    const chatState = useChatStateStore((state) => state.chatState);

    useEffect(() => {
        instance
            .get(`/qufit/chat/rooms/22`)
            .then((res) => {
                setChatList(res.data);
                console.log('채팅 리스트 응답 성공:', res);
            })
            .catch((err: string) => {
                console.log('채팅 리스트 응답 실패:', err);
            });
    }, []);

    return (
        <div className="absolute z-10 flex w-full h-full">
            {/* 친구탭 */}
            <div className="flex flex-col w-full h-full px-20 py-16 lg:px-16 lg:py-12 md:py-10 xs:py-8 xs:px-12">
                <div className="z-10 flex justify-around mb-10 lg:mb-8">
                    <button
                        onClick={() => setButtonFocus('friend')}
                        className={`w-24 h-12 rounded-xl text-white text-2xl ${
                            buttonFocus === 'friend' ? 'font-medium bg-white bg-opacity-30' : ''
                        } lg:text-xl lg:w-20 lg:h-10`}
                    >
                        친구
                    </button>
                    <button
                        onClick={() => setButtonFocus('chat')}
                        className={`w-36 h-12 rounded-xl text-white text-2xl ${
                            buttonFocus === 'chat' ? 'font-medium bg-white bg-opacity-30' : ''
                        } lg:text-xl lg:w-28 lg:h-10`}
                    >
                        채팅 목록
                    </button>
                </div>
                {buttonFocus === 'friend' ? (
                    <div className="z-10 overflow-y-auto scrollbar-hide">
                        {FriendsInfoDummy.map((friend) => (
                            <FriendInfo
                                key={friend.otherMemberId}
                                id={friend.id}
                                otherMemberId={friend.otherMemberId}
                                nickname={friend.nickname}
                                profileImage={friend.profileImage}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="z-10 overflow-y-auto scrollbar-hide">
                        {chatList.map((chat) => (
                            <ChatInfo
                                key={chat.chatRoomId}
                                id={chat.chatRoomId}
                                nickname={chat.otherMemberNickname}
                                otherMemberId={chat.otherMemberId}
                                profileImage={chat.profileImage}
                                lastMessage={chat.lastMessage}
                                unreadCount={chat.unreadCount}
                                lastMessageId={chat.lastMessageId}
                                lastMessageTime={chat.lastMessageTime}
                                lastReadMessageId={chat.lastReadMessageId}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* 채팅창 */}
            <div className="relative flex flex-col items-center justify-center w-full h-full md:absolute sm:absolute xs:absolute">
                <div className="w-full h-full py-16 pr-20 lg:pr-16 lg:py-12 md:p-0 sm:p-0 xs:p-0">
                    <ChatRoom
                        id={chatState[0].id}
                        nickname={chatState[0].nickname}
                        profileImage={chatState[0].profileImage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChattingPage;
