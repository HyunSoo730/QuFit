import { DoorExitIcon } from '@assets/svg/chat';
import useChatStateStore from '@stores/chat/chatStateStore';
import useCloseStateStore from '@stores/chat/closeStateStore';

interface ChatInfoProps {
    id: number;
    nickname: string;
    profileImage: string;
    otherMemberId: number;
    lastMessage: string;
    unreadCount: number;
    lastMessageId: string;
    lastMessageTime: string;
    lastReadMessageId: string;
}

const ChatInfo = ({ id, nickname, profileImage, otherMemberId, lastMessage, unreadCount }: ChatInfoProps) => {
    const setChatState = useChatStateStore((state) => state.setChatState);
    const setIsClosed = useCloseStateStore((state) => state.setIsClosed);

    const handleOnClickButton = () => {
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
            <div className="w-full h-0.5 bg-hotPink" />
            <div className="flex items-center justify-between pl-1">
                <button onClick={handleOnClickButton} className="flex items-center w-full py-5 lg:py-3">
                    <img
                        src={profileImage}
                        alt="user profile image"
                        className="rounded-full w-14 h-14 lg:w-12 lg:h-12 xs:w-12 xs:h-12"
                    />
                    <div className="flex flex-col mx-3.5 lg:mx-2.5 xs:mx-1.5">
                        <div className="flex items-center">
                            <p className="mr-4 text-2xl text-white truncate max-w-72 lg:text-lg lg:mr-3 lg:max-w-60 xs:text-lg xs:max-w-32 xs:mr-1">
                                {nickname}
                            </p>
                            <p className="font-light text-white opacity-80 lg:text-sm xs:text-sm">14 : 32</p>
                        </div>
                        <p className="mt-2 text-xl font-light text-left text-white truncate max-w-96 lg:text-lg lg:mt-1 lg:max-w-72 xs:text-sm xs:mt-1 xs:max-w-36">
                            {lastMessage}
                        </p>
                        <p className="font-light text-white opacity-80 lg:text-sm xs:text-sm">14 : 32</p>
                    </div>
                </button>
                <div className="flex">
                    {unreadCount > 0 && (
                        <div className="flex items-center justify-center w-8 h-8 mr-5 font-bold text-center text-white bg-white rounded-full bg-opacity-40 lg:w-7 lg:h-7 lg:text-sm lg:mr-3 md:w-10 md:h-10 md:mr-8 xs:w-7 xs:h-7 xs:text-sm xs:mr-4">
                            {unreadCount}
                        </div>
                    )}
                    <button>
                        <DoorExitIcon className="w-8 lg:w-7 md:w-10 xs:w-7" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInfo;
