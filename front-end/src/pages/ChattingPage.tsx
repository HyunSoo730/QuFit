import FriendInfo from '@components/chat/FriendInfo';
import ChatInfo from '@components/chat/ChatInfo';
import ChatRoom from '@components/chat/ChatRoom';
import useTabStateStore from '@stores/chat/tabStateStore';
import useChatStateStore from '@stores/chat/chatStateStore';
import { useEffect, useRef, useState } from 'react';
import { useFriendListQuery, useChatListQuery } from '@queries/useChatQuery';
import { FriendInfoProps, ChatListProps } from '@apis/types/response';
import { useMemberInfoStore } from '@stores/member/memberStore';

const ChattingPage = () => {
    const buttonFocus = useTabStateStore((state) => state.buttonFocus);
    const setButtonFocus = useTabStateStore((state) => state.setButtonFocus);

    const chatState = useChatStateStore((state) => state.chatState);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);

    const SIZE = 20;
    const { data: friendListData } = useFriendListQuery(page, SIZE);
    const totalPage = friendListData?.page.totalPages;

    const [friendList, setFriendList] = useState<FriendInfoProps[]>([]);

    const member = useMemberInfoStore();
    const ID = member?.memberId;
    const { data: chatListData, refetch } = useChatListQuery(ID!);

    useEffect(() => {
        if (friendListData) {
            setFriendList((prev) => [...prev, ...friendListData.friendList] as FriendInfoProps[]);
        }
    }, [friendListData]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (
                entries[0].intersectionRect.height === 0 &&
                entries[0].intersectionRect.width !== 0 &&
                totalPage &&
                page <= totalPage - 1
            ) {
                setPage((prev) => {
                    return prev + 1;
                });
            }
        });

        if (scrollRef.current) {
            observer.observe(scrollRef.current);
        }

        return () => {
            if (scrollRef.current) {
                observer.unobserve(scrollRef.current);
            }
        };
    }, [totalPage]);

    return (
        <div className="absolute z-10 flex w-full h-full">
            {/* 친구탭 */}
            <div className="flex flex-col w-full h-full px-20 py-16 lg:px-16 lg:py-12 md:py-10 xs:py-8 xs:px-12">
                <div className="z-10 flex justify-around mb-10 lg:mb-8">
                    <button
                        onClick={() => setButtonFocus('friend')}
                        className={`h-10 px-7 rounded-full text-smokeWhite text-opacity-80 text-xl font-medium ${
                            buttonFocus === 'friend' ? 'bg-white bg-opacity-20 text-opacity-100 text-white' : ''
                        } lg:text-xl lg:w-20 lg:h-10`}
                    >
                        친구
                    </button>
                    <button
                        onClick={() => setButtonFocus('chat')}
                        className={`h-10 px-7 rounded-full text-smokeWhite text-opacity-80 text-xl font-medium ${
                            buttonFocus === 'chat' ? 'bg-white bg-opacity-20 text-opacity-100 text-white' : ''
                        } lg:text-xl lg:w-28 lg:h-10`}
                    >
                        채팅 목록
                    </button>
                </div>
                {buttonFocus === 'friend' ? (
                    <div className="z-10 overflow-y-auto scrollbar-hide">
                        {friendList.map((friend) => (
                            <FriendInfo
                                key={friend.id}
                                otherMemberId={friend.id}
                                chatRoomId={friend.chatRoomId}
                                nickname={friend.nickname}
                                profileImage={friend.profileImage}
                            />
                        ))}

                        <div ref={scrollRef} />
                    </div>
                ) : (
                    <div className="z-10 overflow-y-auto scrollbar-hide">
                        {chatListData?.data.map((chat: ChatListProps) => (
                            <ChatInfo
                                key={chat.chatRoomId}
                                id={chat.chatRoomId}
                                nickname={chat.otherMemberNickname}
                                otherMemberId={chat.otherMemberId}
                                profileImage={chat.profileImage}
                                lastMessage={chat.lastMessage}
                                lastMessageTime={chat.lastMessageTime}
                                unreadCount={chat.unreadCount}
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
                        refetch={refetch}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChattingPage;
