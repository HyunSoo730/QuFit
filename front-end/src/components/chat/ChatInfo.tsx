import useChatStateStore from '@stores/chat/chatStateStore';
import useCloseStateStore from '@stores/chat/closeStateStore';
import { useEffect, useState } from 'react';

interface ChatInfoProps {
    id: number;
    nickname: string;
    profileImage: string;
    otherMemberId: number;
    lastMessage: string;
    unreadCount: number;
    lastMessageId?: string;
    lastMessageTime?: Date;
    lastReadMessageId?: string;
}

const ChatInfo = ({
    id,
    nickname,
    profileImage,
    otherMemberId,
    lastMessage,
    lastMessageTime,
    unreadCount,
}: ChatInfoProps) => {
    const setChatState = useChatStateStore((state) => state.setChatState);
    const setIsClosed = useCloseStateStore((state) => state.setIsClosed);
    const [unreadCnt, setUnreadCnt] = useState(`${unreadCount}`);
    const [lastMsgTime, setLastMsgTime] = useState('');

    useEffect(() => {
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
        const todayDay = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`;

        const todayDate = `${todayYear}. ${todayMonth}. ${todayDay}`;

        const date = new Date(lastMessageTime as Date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        const chatDate = `${year}. ${month}. ${day}`;

        if (unreadCount > 99) {
            setUnreadCnt('99+');
        }

        if (chatDate === '1970. 01. 01') {
            setLastMsgTime('');
            return;
        }

        if (todayDate !== chatDate) {
            setLastMsgTime(chatDate);
        } else {
            const hours = date.getHours() >= 10 ? `${date.getHours()} : ` : `0${date.getHours()} : `;
            const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;

            setLastMsgTime(`${hours}${minutes}`);
        }
    }, [unreadCount, lastMessageTime]);

    const handleOnClickButton = () => {
        console.log('채팅리스트:', )
        setChatState([
            {
                id: id,
                nickname: nickname,
                profileImage: profileImage,
                otherMemberId: otherMemberId,
            },
        ]);
        setIsClosed(false);
    };

    return (
        <div className="flex flex-col">
            <div className="w-full h-px bg-smokeWhite opacity-80" />
            <div className="flex items-center justify-between pl-1">
                <button onClick={handleOnClickButton} className="flex items-center w-full py-5 lg:py-3">
                    <img
                        src="https://i.pinimg.com/236x/6f/16/f1/6f16f17340ba194e07dab3aa5fa9c50a.jpg"
                        alt="user profile image"
                        className="w-12 h-12 rounded-full lg:w-12 lg:h-12 xs:w-12 xs:h-12"
                    />
                    <div className="flex flex-col mx-3.5 lg:mx-2.5 xs:mx-1.5">
                        <div className="flex items-center">
                            <p className="mr-4 text-2xl text-white truncate max-w-72 lg:text-lg lg:mr-3 lg:max-w-60 xs:text-lg xs:max-w-32 xs:mr-1">
                                {nickname}
                            </p>
                            <p className="text-sm text-smokeWhite opacity-70 lg:text-sm xs:text-sm">{lastMsgTime}</p>
                        </div>
                        <p className="mt-2 text-xl text-left text-white truncate opacity-80 max-w-96 lg:text-lg lg:mt-1 lg:max-w-72 xs:text-sm xs:mt-1 xs:max-w-36">
                            {lastMessage}
                        </p>
                    </div>
                </button>
                <div className="flex">
                    {unreadCount > 0 && (
                        <div className="flex items-center justify-center w-8 h-8 mr-5 text-sm font-bold text-center text-white bg-white rounded-full bg-opacity-20 lg:w-7 lg:h-7 lg:text-sm lg:mr-3 md:w-10 md:h-10 md:mr-8 xs:w-7 xs:h-7 xs:text-sm xs:mr-4">
                            {unreadCnt}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatInfo;
