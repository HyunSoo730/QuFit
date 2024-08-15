import { CupidIcon, XIcon, EmptyChatIcon, DoorExitIcon } from '@assets/svg/chat';
import useChatStateStore from '@stores/chat/chatStateStore';
import useCloseStateStore from '@stores/chat/closeStateStore';
import * as StompJs from '@stomp/stompjs';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemberInfoStore } from '@stores/member/memberStore';
import { useTokenStore } from '@stores/auth/tokenStore';

interface ChatRoomProps {
    id: number;
    nickname: string;
    profileImage: string;
    refetch: () => void;
}

interface ChatListProps {
    id: string;
    senderId: number;
    content: string;
    timestamp: string;
}

const ChatRoom = ({ id, nickname, refetch }: ChatRoomProps) => {
    const member = useMemberInfoStore();
    const senderId = member?.memberId;

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
    const [scrollTopUpdate, setScrollTopUpdate] = useState(0);

    const dateStampList: string[] = [];
    const senderDifferTimeList: number[] = [];
    const otherDifferTimeList: number[] = [];

    const msgBox = chatList.map((item, idx) => {
        let isDate = true;

        const date = new Date(item.timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        const dateData = `${year}. ${month}. ${day}`;

        if (!dateStampList.includes(dateData)) {
            dateStampList.push(dateData);
        } else {
            isDate = false;
        }

        if (item.senderId === senderId) {
            let isLastTime = false;

            const date = new Date(item.timestamp);
            let hours = date.getHours() >= 10 ? `${date.getHours()} : ` : `0${date.getHours()} : `;
            let minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
            let nowHours = date.getHours() >= 10 ? `${date.getHours()} : ` : `0${date.getHours()} : `;
            let nowMinutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;

            if (chatList[idx + 1] && chatList[idx + 1].senderId === senderId) {
                const nextDate = new Date(chatList[idx + 1].timestamp);
                const nextHours =
                    nextDate.getHours() >= 10 ? `${nextDate.getHours()} : ` : `0${nextDate.getHours()} : `;
                const nextMinutes = nextDate.getMinutes() >= 10 ? nextDate.getMinutes() : `0${nextDate.getMinutes()}`;

                if (hours === nextHours && minutes === nextMinutes) {
                    hours = '';
                    minutes = '';
                } else {
                    isLastTime = true;
                }
            }

            if (chatList[idx - 1]) {
                const prevDate = new Date(chatList[idx - 1].timestamp);
                const prevHours =
                    prevDate.getHours() >= 10 ? `${prevDate.getHours()} : ` : `0${prevDate.getHours()} : `;
                const prevMinutes = prevDate.getMinutes() >= 10 ? prevDate.getMinutes() : `0${prevDate.getMinutes()}`;

                if (nowHours !== prevHours || nowMinutes !== prevMinutes) {
                    senderDifferTimeList.push(idx);
                }
            }

            return (
                <div key={idx}>
                    {isDate && (
                        <div className="flex justify-center my-9">
                            <span className="px-5 py-1 text-xl font-semibold bg-white rounded-full font-barlow text-smokeWhite text-opacity-80 bg-opacity-10">
                                {dateData}
                            </span>
                        </div>
                    )}
                    <div className={`flex justify-end ${isLastTime && 'mb-4'}`}>
                        <span className="italic font-semibold text-white opacity-50 font-barlow mr-2.5 mt-auto pb-2">
                            {hours}
                            {minutes}
                        </span>
                        <div
                            className={`text-left w-fit max-w-72 bg-lightPurple-4 mb-2.5 py-2.5 px-4 rounded-2xl   ${
                                senderDifferTimeList.includes(idx) && 'rounded-tr-none'
                            }`}
                        >
                            <span className="text-sm text-black break-all whitespace-pre-wrap">{item.content}</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            let isLastTime = false;

            const date = new Date(item.timestamp);
            let hours = date.getHours() >= 10 ? `${date.getHours()} : ` : `0${date.getHours()} : `;
            let minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
            let nowHours = date.getHours() >= 10 ? `${date.getHours()} : ` : `0${date.getHours()} : `;
            let nowMinutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;

            if (chatList[idx + 1] && chatList[idx + 1].senderId === item.senderId) {
                const nextDate = new Date(chatList[idx + 1].timestamp);
                const nextHours =
                    nextDate.getHours() >= 10 ? `${nextDate.getHours()} : ` : `0${nextDate.getHours()} : `;
                const nextMinutes = nextDate.getMinutes() >= 10 ? nextDate.getMinutes() : `0${nextDate.getMinutes()}`;

                if (hours === nextHours && minutes === nextMinutes) {
                    hours = '';
                    minutes = '';
                } else {
                    isLastTime = true;
                }
            }

            if (chatList[idx - 1]) {
                const prevDate = new Date(chatList[idx - 1].timestamp);
                const prevHours =
                    prevDate.getHours() >= 10 ? `${prevDate.getHours()} : ` : `0${prevDate.getHours()} : `;
                const prevMinutes = prevDate.getMinutes() >= 10 ? prevDate.getMinutes() : `0${prevDate.getMinutes()}`;

                if (nowHours !== prevHours || nowMinutes !== prevMinutes) {
                    otherDifferTimeList.push(idx);
                }
            }

            return (
                <div key={idx}>
                    {isDate && (
                        <div className="flex justify-center my-9">
                            <span className="px-5 py-1 text-xl font-semibold bg-white rounded-full font-barlow text-smokeWhite text-opacity-80 bg-opacity-10">
                                {dateData}
                            </span>
                        </div>
                    )}
                    <div className={`flex justify-start ${isLastTime && 'mb-4'}`}>
                        <img
                            src="https://i.pinimg.com/236x/6f/16/f1/6f16f17340ba194e07dab3aa5fa9c50a.jpg"
                            alt="user profile image"
                            className={`rounded-full ${
                                otherDifferTimeList.includes(idx) ? 'w-10 h-10 mr-3' : 'w-0 h-0 ml-[3.25rem]'
                            }`}
                        />
                        <div className="flex flex-col">
                            <span
                                className={`mb-1 text-sm font-medium text-left text-white opacity-80 ${
                                    !otherDifferTimeList.includes(idx) && 'hidden'
                                }`}
                            >
                                {nickname}
                            </span>
                            <div
                                className={`text-left w-fit max-w-72 bg-white bg-opacity-20 mb-2.5 py-2.5 px-4 rounded-2xl  ${
                                    otherDifferTimeList.includes(idx) && 'rounded-tl-none'
                                }`}
                            >
                                <span className="text-sm text-white break-all whitespace-pre-wrap">{item.content}</span>
                            </div>
                        </div>
                        <span className="italic font-semibold text-white opacity-50 font-barlow ml-2.5 mt-auto pb-2">
                            {hours}
                            {minutes}
                        </span>
                    </div>
                </div>
            );
        }
    });

    const callback = function (message: { body: string }) {
        if (message.body) {
            let msg = JSON.parse(message.body);
            setNewMessage(msg);
            refetch();
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
        if (!isLoading) return;

        if (client.current?.active) {
            if (firstMessageId === nowFirstMessageId) {
                setHasMore(false);
                console.log('더 불러올 메시지가 없습니다.');
                return;
            }

            const subscription = client.current?.subscribe(`/user/${senderId}/sub/chat.messages.${id}`, (message) => {
                const messages = JSON.parse(message.body);
                setNowFirstMessageId(messages.messages[0].id);
                setChatList((chats) => [...messages.messages, ...chats]);
                setDataLength(dataLength + 1);
                setIsLoading(false);
            });

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [isLoading]);

    useLayoutEffect(() => {
        requestAnimationFrame(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = scrollTopUpdate;
            }
        });
    }, [dataLength]);

    const fetchData = () => {
        if (scrollContainerRef.current) {
            setScrollTopUpdate(scrollContainerRef.current.scrollTop);
        }

        client.current?.publish({
            destination: `/pub/chat.loadPreviousMessages/${id}`,
            body: JSON.stringify({ messageId: nowFirstMessageId, pageSize: 20 }),
        });
        setIsLoading(true);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [isChat]);

    // 소켓 연결
    const connect = () => {
        const accessToken = useTokenStore.getState().accessToken;

        try {
            client.current = new StompJs.Client({
                brokerURL: import.meta.env.VITE_WEBSOCKET_BASE_URL,
                connectHeaders: {
                    Authorization: `Bearer  ${accessToken}`,
                },
                debug: function (str) {
                    console.log(str);
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
        refetch();
        setChat('');
    };

    const onChangeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChat(e.target.value);
    };

    const handleCloseButton = () => {
        if (chatList.length > 0) {
            const lastMessage = chatList[chatList.length - 1];

            client.current?.publish({
                destination: `/pub/chat.leaveRoom/${id}`,
                body: JSON.stringify({
                    id: lastMessage.id,
                    timestamp: lastMessage.timestamp,
                }),
            });
        } else {
            client.current?.publish({
                destination: `/pub/chat.leaveRoom/${id}`,
                body: JSON.stringify({
                    id: null,
                    timestamp: null,
                }),
            });
        }

        setChatList([]);

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

    const handleDelButton = () => {
        try {
            client.current?.publish({
                destination: `/pub/chat.removeRoom/${id}`,
            });

            client.current?.subscribe(`/user/${senderId}/sub/chat.rooms`, () => {
                refetch();
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div
                className={`absolute flex flex-col items-center w-full h-[calc(100%-11.375rem)] justify-center ${
                    chatState[0].id === 0 ? 'opacity-100' : 'opacity-0 scale-95'
                } md:invisible sm:invisible xs:invisible`}
            >
                <EmptyChatIcon className="w-56 mb-4" />
                <p className="text-2xl text-center text-white bottom-8 w-80 opacity-80">채팅할 상대를 선택해주세요.</p>
            </div>
            <div
                className={`flex flex-col w-full h-full transition-all duration-200 ease-out  ${
                    isClosed || chatState[0].id === 0 ? 'scale-95 opacity-0' : 'opacity-100'
                } md:transition-none sm:transition-none xs:transition-none`}
            >
                <div className="flex flex-col w-full h-full z-20 md:bg-chatPageBg md:effect-whitePink md:rounded-b-[3rem] sm:bg-chatPageBg sm:effect-whitePink sm:rounded-b-[3rem] xs:bg-chatPageBg xs:effect-whitePink xs:rounded-b-[3rem]">
                    {/* header */}
                    <div className="w-full relative flex items-center h-20 effect-whitePink bg-pink bg-opacity-5 py-6 rounded-t-[1.875rem] lg:h-16 md:rounded-none  md:effect-none md:py-12 sm:rounded-none  sm:effect-none sm:py-12 xs:rounded-none  xs:effect-none xs:py-12 ">
                        <div className="absolute z-10 flex justify-between w-full px-12 lg:px-10 xs:px-6">
                            <div className="flex items-center">
                                <img
                                    src="https://i.pinimg.com/236x/6f/16/f1/6f16f17340ba194e07dab3aa5fa9c50a.jpg"
                                    alt="user profile image"
                                    className="w-10 h-10 rounded-full lg:w-10 lg:h-10"
                                />
                                <p className="mx-3.5 font-medium text-white truncate max-w-72 lg:text-lg">{nickname}</p>
                                <button onClick={handleDelButton}>
                                    <DoorExitIcon className="w-6 opacity-70 fill-smokeWhite lg:w-7 md:w-10 xs:w-7" />
                                </button>
                            </div>
                            <button onClick={handleCloseButton}>
                                <XIcon className="w-10" />
                            </button>
                        </div>
                    </div>
                    {/* contents */}
                    <div className="w-full max-h-[calc(100%-6.5rem)] h-[calc(100%-6.5rem)] effect-whitePink bg-pink bg-opacity-5 rounded-b-[1.875rem] md:border-none md:effect-none sm:border-none sm:effect-none xs:border-none xs:effect-none">
                        <div className="z-10 flex flex-col w-full h-full px-12 pb-12 lg:px-10 lg:pb-10 md:h-[calc(100%-5.5rem)] sm:h-[calc(100%-5.5rem)] xs:h-[calc(100%-5.5rem)] xs:px-6">
                            <div
                                id="scrollableDiv"
                                ref={scrollContainerRef}
                                className="flex flex-col-reverse my-7 overflow-y-auto scrollbar-hide h-full lg:max-h-[calc(100%-5rem)] md:max-h-[calc(100%-8rem)] md:my-0 sm:max-h-[calc(100%-8rem)] sm:my-0 xs:max-h-[calc(100%-8rem)] xs:my-0"
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
                                    className="relative w-full pr-20 text-white bg-transparent border rounded-full outline-none h-14 caret-white border-lightPurple-1 effect-whitePink pl-7 placeholder:text-white placeholder:opacity-60 lg:h-12 md:h-20 md:text-xl md:pr-24 sm:h-20 sm:text-xl sm:pr-24 xs:h-20 xs:text-xl xs:pr-24"
                                />
                                <button onClick={sendChat} className="absolute mr-10 right-6 xs:mr-6">
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
