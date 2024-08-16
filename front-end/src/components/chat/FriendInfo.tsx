import { StartChatIcon, DeleteFriendIcon } from '@assets/svg/chat';
import useCloseStateStore from '@stores/chat/closeStateStore';
import { useDeleteFriendMutation, usePostChatMutation } from '@queries/useChatQuery';
import useChatStateStore from '@stores/chat/chatStateStore';

interface FriendInfoProps {
    nickname: string;
    profileImage: string;
    otherMemberId: number;
    chatRoomId: number;
}

const FriendInfo = ({ otherMemberId, chatRoomId, nickname, profileImage }: FriendInfoProps) => {
    const setChatState = useChatStateStore((state) => state.setChatState);

    const setIsClosed = useCloseStateStore((state) => state.setIsClosed);

    const postChatMutation = usePostChatMutation(otherMemberId, nickname, profileImage, chatRoomId);
    const deleteFriendMutation = useDeleteFriendMutation();

    const handleStartChatButton = () => {
        postChatMutation.mutate();
        setChatState([
            {
                id: chatRoomId,
                nickname: nickname,
                profileImage: profileImage,
                otherMemberId: otherMemberId,
            },
        ]);

        setIsClosed(false);
    };

    const handleDeleteFriendButton = () => {
        // 친구 삭제 요청 보내기
        deleteFriendMutation.mutate(otherMemberId);
    };

    return (
        <div className="flex flex-col">
            <div className="w-full h-px bg-smokeWhite opacity-40" />
            <div className="flex items-center justify-between pl-1 pr-9 lg:pr-7 xs:pr-2">
                <div className="flex items-center py-5 lg:py-3">
                    <img
                        src={profileImage}
                        alt="user profile image"
                        className="w-12 h-12 rounded-full lg:w-12 lg:h-12 xs:w-12 xs:h-12"
                    />
                    <p className="text-2xl text-white mx-3.5 max-w-72 truncate lg:text-xl lg:mx-2.5 lg:max-w-60 xs:text-lg xs:max-w-52 xs:mx-2">
                        {nickname}
                    </p>
                    <button onClick={handleDeleteFriendButton}>
                        <DeleteFriendIcon className="w-6 pt-1 lg:w-5 md:w-8 xs:w-6 xs:mr-10" />
                    </button>
                </div>
                <button onClick={handleStartChatButton}>
                    <StartChatIcon className="w-9 lg:w-7 md:w-10" />
                </button>
            </div>
        </div>
    );
};

export default FriendInfo;
