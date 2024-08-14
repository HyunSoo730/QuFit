import ParticipantVideo from '@components/video/ParticipantVideo';
import PersonalResult from '@components/video/PersonalResult';
import PersonalVideoTimer from '@components/video/PersonalVideoTimer';
import useModal from '@hooks/useModal';
import { useOtherIdxStore, usePrivateParticipantsStore, useRoomParticipantsStore } from '@stores/video/roomStore';
import { useState } from 'react';
import { PERSONAL_VIDEO_END_SEC } from '@components/game/Constants';
import useRoom from '@hooks/useRoom';
import { useNavigate, useParams } from 'react-router-dom';
import useMember from '@hooks/useMember';
import MoveRoomModal from '@modals/video/MoveRoomModal';
import { instance } from '@apis/axios';
import { PATH } from '@routers/PathConstants';
const PersonalVideoPage = () => {
    const participants = useRoomParticipantsStore();
    const privateParticipants = usePrivateParticipantsStore();
    const [isMeeting, setIsMeeting] = useState(true);
    const { leaveRoom, createRoom, joinRoom, setPrivateRoom, otherGenderParticipants } = useRoom();
    const { open, close, Modal } = useModal();
    const { roomId } = useParams();
    const { member } = useMember();
    const navigate = useNavigate();
    const otherIdx = useOtherIdxStore();

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
                <MoveRoomModal onClose={close} onClick={handleConfirmModal} message={'다른 방으로 이동해주세요.'} />
            </Modal>

            {isMeeting && (
                <div className="flex flex-col justify-between h-full">
                    <PersonalVideoTimer endSec={PERSONAL_VIDEO_END_SEC} onEnd={endTimer} />
                    <div className="flex w-full gap-[2.5rem] p-12">
                        <ParticipantVideo
                            roomMax={2}
                            gender="m"
                            participants={privateParticipants}
                            status={'meeting'}
                        />
                        <ParticipantVideo
                            roomMax={2}
                            gender="f"
                            participants={privateParticipants}
                            status={'meeting'}
                        />
                    </div>
                    <PersonalResult />
                </div>
            )}
        </>
    );
};

export default PersonalVideoPage;
