import { CupidIcon, XIcon, EmptyChatIcon } from '@assets/svg/chat';
import useChatStateStore from '@stores/chat/chatStateStore';
import useCloseStateStore from '@stores/chat/closeStateStore';
import * as StompJs from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
interface ChatRoomProps {
    id: number;
    nickname: string;
    profileImage: string;
}

interface ChatListProps {
    id: string;
    senderId: number;
    content: string;
    timestamp: string;
}

const ChatRoom = ({ id, nickname, profileImage }: ChatRoomProps) => {
    const senderId = 22;

    // Store
    const isClosed = useCloseStateStore((state) => state.isClosed);
    const setIsClosed = useCloseStateStore((state) => state.setIsClosed);

    const chatState = useChatStateStore((state) => state.chatState);
    const setChatState = useChatStateStore((state) => state.setChatState);

    // 채팅 전송 및 수신을 위한 값들
    const client = useRef<StompJs.Client | null>(null);

    const [chat, setChat] = useState('');
    const [chatList, setChatList] = useState<ChatListProps[]>([]);
    const [newMessage, setNewMessage] = useState(null);
    const [isChat, setIsChat] = useState(false); // 내 채팅인지 아닌지 확인해주는 값
    const [firstMessageId, setFirstMessageId] = useState('');
    const [nowFirstMessageId, setNowFirstMessageId] = useState('');

    // InfiniteScroll을 위한 값들
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [dataLength, setDataLength] = useState(0);

    const msgBox = chatList.map((item, idx) => {
        if (item.senderId === senderId) {
            return (
                <div key={idx} className="font-bold bg-lightPurple-1">
                    <span>{item.content}</span>
                </div>
            );
        } else {
            return (
                <div key={idx}>
                    <span>{item.content}</span>
                </div>
            );
        }
    });

    const callback = function (message: { body: string }) {
        if (message.body) {
            console.log('수신된 메시지:', message.body);
            let msg = JSON.parse(message.body);
            setNewMessage(msg);
        } else {
            console.log('빈 메시지 수신');
        }
    };

    useEffect(() => {
        if (newMessage) {
            setChatList((chats) => [...chats, newMessage]);
            setIsChat(!isChat);
        }
    }, [newMessage]);

    // 위아래 스크롤 이벤트
    useEffect(() => {
        if (client.current?.active) {
            if (firstMessageId === nowFirstMessageId) {
                setHasMore(false);
                console.log('더 불러올 메시지가 없습니다.');
            }

            const subscription = client.current?.subscribe(`/user/${senderId}/sub/chat.messages.${id}`, (message) => {
                const messages = JSON.parse(message.body);
                console.log('스크롤 구독 메시지:', messages.messages);
                setNowFirstMessageId(messages.messages[0].id);
                setChatList((chats) => [...messages.messages, ...chats]);
                setIsLoading(false);
                setDataLength(dataLength + 1);
            });

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [isLoading]);

    const fetchData = () => {
        if (isLoading) return;
        setIsLoading(true);

        const scrollTopBeforeUpdate = scrollContainerRef.current?.scrollTop;

        client.current?.publish({
            destination: `/pub/chat.loadPreviousMessages/${id}`,
            body: JSON.stringify({ messageId: nowFirstMessageId, pageSize: 40 }),
        });

        // 디자인 후, 스크롤값 수정 필요 지금은 에러 안나게 대충 조정돼있음!
        setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = scrollTopBeforeUpdate! + 1140;
            }
        }, 0);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        console.log('맨 아래로 스크롤');
        scrollToBottom();
    }, [isChat]);

    // 소켓 연결
    const connect = () => {
        try {
            client.current = new StompJs.Client({
                brokerURL: 'ws://i11a209.p.ssafy.io:8080/stomp/chat',
                connectHeaders: {
                    Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
                },
                debug: function (str) {
                    console.log('소켓 디버그:', str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    client.current?.publish({
                        destination: `/pub/chat.enterRoom/${id}`,
                        body: JSON.stringify({ pageSize: 20 }),
                    });
                    client.current?.subscribe(`/user/${senderId}/sub/chatroom.${id}`, (message) => {
                        if (message.body) {
                            const response = JSON.parse(message.body);
                            const messages = response.messages;
                            const firstId = response.firstMessageId;
                            setChatList(messages);
                            setFirstMessageId(firstId);
                            setNowFirstMessageId(messages[0].id);
                        }
                    });
                    client.current?.subscribe(`/sub/chatroom.${id}`, callback);
                },
            });

            if (client.current) {
                client.current.activate();
            } else {
                console.log('클라이언트가 초기화되지 않았습니다.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    // 연결 끊기
    const disConnect = () => {
        if (client.current === null) {
            return;
        }
        client.current.deactivate();
    };

    useEffect(() => {
        if (id !== 0) {
            connect();
        }

        return () => disConnect();
    }, [id]);

    const sendChat = () => {
        if (chat === '') {
            return;
        }

        client.current?.publish({
            destination: `/pub/chat.sendMessage/${id}`,
            body: JSON.stringify({
                senderId: senderId,
                chatRoomId: id,
                content: chat,
            }),
        });

        setChat('');
    };

    const onChangeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChat(e.target.value);
    };

    const handleCloseButton = () => {
        const lastMessage = chatList[chatList.length - 1];

        client.current?.publish({
            destination: `/pub/chat.leaveRoom/${id}`,
            body: JSON.stringify({
                id: lastMessage.id,
                timestamp: lastMessage.timestamp,
            }),
        });

        setIsClosed(true);

        setTimeout(() => {
            setChatState([
                {
                    id: 0,
                    nickname: '',
                    profileImage: '',
                    otherMemberId: 0,
                },
            ]);
        }, 200);
    };

    return (
        <>
            <div
                className={`absolute flex flex-col items-center pb-10 left-1/4 top-1/3  ${
                    chatState[0].id === 0 ? 'opacity-100' : 'opacity-0 scale-95'
                } md:invisible sm:invisible xs:invisible`}
            >
                <EmptyChatIcon className="w-56 pr-10" />
                <p className="absolute text-2xl text-center text-white bottom-8 w-80 opacity-80 animate-pulse">
                    채팅할 상대를 선택해주세요.
                </p>
            </div>
            <div
                className={`flex flex-col w-full h-full transition-all duration-200 ease-out  ${
                    isClosed || chatState[0].id === 0 ? 'scale-95 opacity-0' : 'opacity-100'
                } md:transition-none sm:transition-none xs:transition-none`}
            >
                <div className="flex flex-col w-full h-full z-20 md:bg-chatPageBg md:effect-whitePink md:rounded-b-[3rem] sm:bg-chatPageBg sm:effect-whitePink sm:rounded-b-[3rem] xs:bg-chatPageBg xs:effect-whitePink xs:rounded-b-[3rem]">
                    {/* header */}
                    <div className="w-full relative flex items-center h-20 border-t-4 effect-whitePink border-x-4 py-6 border-lightPurple-3 rounded-t-[1.875rem] lg:h-16 md:rounded-none md:border-none md:effect-none md:py-12 sm:rounded-none sm:border-none sm:effect-none sm:py-12 xs:rounded-none xs:border-none xs:effect-none xs:py-12 ">
                        <div className="absolute z-10 flex justify-between w-full px-12 lg:px-10 xs:px-6">
                            <div className="flex items-center">
                                <img
                                    src={profileImage}
                                    alt="user profile image"
                                    className="rounded-full w-14 h-14 lg:w-10 lg:h-10"
                                />
                                <p className="ml-3.5 text-xl font-medium text-white truncate max-w-72 lg:text-lg">
                                    {nickname}
                                </p>
                            </div>
                            <button onClick={handleCloseButton}>
                                <XIcon className="w-10" />
                            </button>
                        </div>
                    </div>
                    {/* contents */}
                    <div className="w-full h-full border-t-2 border-b-4 effect-pureWhite border-x-4 border-lightPurple-3 rounded-b-[1.875rem] md:border-none md:effect-none sm:border-none sm:effect-none xs:border-none xs:effect-none">
                        <div className="absolute z-10 flex flex-col w-full h-full px-12 pb-12 lg:px-10 lg:pb-10 md:h-[calc(100%-5.5rem)] sm:h-[calc(100%-5.5rem)] xs:h-[calc(100%-5.5rem)] xs:px-6">
                            <div
                                id="scrollableDiv"
                                ref={scrollContainerRef}
                                className="flex flex-col-reverse items-center my-5 overflow-y-auto max-h-[calc(100%-6.5rem)] lg:max-h-[calc(100%-5rem)] md:max-h-[calc(100%-8rem)] md:my-0 sm:max-h-[calc(100%-8rem)] sm:my-0 xs:max-h-[calc(100%-8rem)] xs:my-0"
                            >
                                <InfiniteScroll
                                    dataLength={dataLength}
                                    next={fetchData}
                                    hasMore={hasMore}
                                    inverse={true}
                                    loader={<h4>Loading...</h4>}
                                    scrollableTarget="scrollableDiv"
                                >
                                    {msgBox}
                                    <div ref={messagesEndRef} />
                                </InfiniteScroll>
                            </div>
                            <div className="flex items-center mt-auto">
                                <input
                                    type="text"
                                    value={chat}
                                    onChange={onChangeChat}
                                    onKeyDown={(e) => {
                                        e.key === 'Enter' && sendChat();
                                    }}
                                    placeholder="채팅을 입력하세요."
                                    className="relative w-full pr-20 text-white bg-transparent border-4 rounded-full outline-none h-14 caret-white border-lightPurple-3 effect-purePink pl-7 placeholder:text-white placeholder:opacity-80 lg:h-12 md:h-20 md:text-xl md:pr-24 sm:h-20 sm:text-xl sm:pr-24 xs:h-20 xs:text-xl xs:pr-24"
                                />
                                <button onClick={sendChat} className="absolute mr-12 right-6 xs:mr-6">
                                    <CupidIcon className="w-10 md:w-14 sm:w-14 xs:w-14" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatRoom;
