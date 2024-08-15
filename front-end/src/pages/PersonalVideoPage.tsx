import ParticipantVideo from '@components/video/ParticipantVideo';
import PersonalResult from '@components/video/PersonalResult';
import PersonalVideoTimer from '@components/video/PersonalVideoTimer';
import useModal from '@hooks/useModal';
import { useOtherIdxStore, useRoomParticipantsStore } from '@stores/video/roomStore';
import { useEffect, useRef, useState } from 'react';
import { PERSONAL_VIDEO_END_SEC } from '@components/game/Constants';
import useRoom from '@hooks/useRoom';
import { useNavigate, useParams } from 'react-router-dom';
import useMember from '@hooks/useMember';
import MoveRoomModal from '@modals/video/MoveRoomModal';
import { instance } from '@apis/axios';
import { PATH } from '@routers/PathConstants';
import * as StompJs from '@stomp/stompjs';
import { afterSubscribe, connect, disConnect, publishSocket } from '@utils/websocketUtil';
// import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

const PersonalVideoPage = () => {
    const participants = useRoomParticipantsStore();
    // const privateParticipants = usePrivateParticipantsStore();
    const [isMeeting, setIsMeeting] = useState(true);
    const { leaveRoom, createRoom, joinRoom, setPrivateRoom, otherGenderParticipants } = useRoom();
    const { open, close, Modal } = useModal();
    const { roomId } = useParams();
    const { member } = useMember();
    const navigate = useNavigate();
    const otherIdx = useOtherIdxStore();
    const [isFriend, setIsFriend] = useState(false);
    const other = participants.find((participant) => participant.id !== member?.memberId);
    const [isFriendAccept, setIsFriendAccept] = useState(false);

    const client = useRef<StompJs.Client | null>(null);
    const onConnect = () => {
        client.current?.subscribe(`/user/${other?.id}/sub/game`, (message) => {
            const response = JSON.parse(message.body);

            afterSubscribe(response, '상대방이 친구를 수락했습니다.', () => {
                isFriend && setIsFriendAccept(true);
                isFriend &&
                    publishSocket(
                        {
                            memberA: member?.memberId,
                            memberB: other?.id,
                        },
                        client,
                        Number(roomId),
                    );
            });
        });
    };

    const wantFriend = () => {
        publishSocket(
            {
                isFriend: true,
                memberId: other?.id,
            },
            client,
            Number(roomId),
        );
        setIsFriend(true);
    };

    useEffect(() => {
        // setRoomId(Number(roomId)); //나중에 param에서 따와야함
        connect(client, onConnect);
        return () => disConnect(client);
    }, []);

    // console.log(participants);

    const endTimer = () => {
        leaveRoom(Number(roomId));
        if (member?.gender === 'm') {
            createRoom({
                videoRoomName: '개인방',
                maxParticipants: 2,
                mainTag: '',
                videoRoomHobbies: [],
                videoRoomPersonalities: [],
            });
        }
        setIsMeeting(false);
        open();
    };
    const handleConfirmModal = async () => {
        if (member?.gender === 'm') {
            const response = await instance.get(`qufit/video/recent`, {
                params: { hostId: member.memberId },
            });
            navigate(PATH.PERSONAL_VIDEO(Number(response.data['videoRoomId: '])));
        } else if (member?.gender === 'f') {
            const response = await instance.get(`qufit/video/recent`, {
                params: { hostId: otherGenderParticipants[otherIdx].id },
            });
            joinRoom(response.data['videoRoomId: ']);
            navigate(PATH.PERSONAL_VIDEO(Number(response.data['videoRoomId: '])));
        }
        setPrivateRoom();
    };
    return (
        <>
            <Modal>
                <MoveRoomModal
                    onClose={close}
                    onClick={handleConfirmModal}
                    message={
                        isFriendAccept
                            ? '상대방과 친구가 되었어요!. 다른 방으로 이동해주세요.'
                            : '상대방과 친구가 되지 못했어요. 다른 방으로 이동해주세요.'
                    }
                />
            </Modal>

            {isMeeting && (
                <div className="flex flex-col justify-between h-full">
                    <PersonalVideoTimer endSec={PERSONAL_VIDEO_END_SEC} onEnd={endTimer} />

                    {!isFriend ? (
                        <button onClick={wantFriend}>친구추가버튼</button>
                    ) : (
                        <p className="text-lg font-bold text-white">상대방도 좋아요를 누르면 친구추가가 됩니다.</p>
                    )}
                    <div className="flex w-full gap-[2.5rem] p-12">
                        <ParticipantVideo roomMax={2} gender="m" participants={participants} status={'meeting'} />
                        <ParticipantVideo roomMax={2} gender="f" participants={participants} status={'meeting'} />
                    </div>
                    <PersonalResult />
                </div>
            )}
        </>
    );
};

export default PersonalVideoPage;
