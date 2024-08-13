import { useSetRoomIdStore } from '@stores/video/roomStore';
import useRoom from '@hooks/useRoom';
import ParticipantVideo from '@components/video/ParticipantVideo';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTimer from '@hooks/useTimer';
import useMember from '@hooks/useMember';
import { GROUP_VIDEO_END_SEC } from '@components/game/Constants';

import { afterSubscribe, connect, disConnect, publishSocket } from '@utils/websocketUtil';
import * as StompJs from '@stomp/stompjs';
import MeetingStartButton from '@components/game/MeetingStartButton';
import { PATH } from '@routers/PathConstants';

const VideoWaitPage = () => {
    const roomMax = 8;
    const [_, setIsMettingStart] = useState(false);
    // const { videoRoomId } = useParams();
    const { createRoom, joinRoom, leaveRoom } = useRoom();
    const roomId = 31;
    const setRoomId = useSetRoomIdStore();
    const client = useRef<StompJs.Client | null>(null);
    const { member } = useMember();

    const onConnect = () => {
        client.current?.subscribe(`/sub/game/${roomId}`, (message) => {
            const response = JSON.parse(message.body);

            afterSubscribe(response, '미팅룸 시작을 성공했습니다.', () => {
                setIsMettingStart(true);
            });
        });
    };
    const navigate = useNavigate();

    const startMeeting = () => {
        publishSocket(
            {
                isRoomStart: true,
            },
            client,
            roomId,
        );
        setIsMettingStart(true);
    };

    useEffect(() => {
        setRoomId(roomId); //나중에 param에서 따와야함
        connect(client, onConnect);
        return () => disConnect(client);
    }, []);
    const restSec = useTimer(GROUP_VIDEO_END_SEC, () => {
        if (member?.gender === 'm') {
            createRoom();
        }
    });

    return (
        <>
            <div className="flex flex-col justify-between w-full h-screen ">
                <ParticipantVideo roomMax={roomMax} gender="m" />
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="flex flex-col gap-4">
                        <button onClick={createRoom}>생성하기</button>

                        <button
                            onClick={() => {
                                joinRoom(roomId);
                            }}
                        >
                            입장하기
                        </button>
                        <button onClick={() => leaveRoom(roomId)}>나가기</button>
                    </div>
                    <MeetingStartButton
                        onNext={() => {
                            navigate(PATH.GROUP_VIDEO(roomId));
                        }}
                        onClick={startMeeting}
                    />

                    {/* {roomStep === 'active' && <GameIntro onNext={startGame} />} */}
                </div>
                <ParticipantVideo roomMax={roomMax} gender="f" />
            </div>
        </>
    );
};

export default VideoWaitPage;

/* <div className="hidden">
                    {participants.map((participant) => (
                        <AudioComponent
                            key={participant.nickname}
                            track={
                                participant.info.audioTrackPublications.values().next().value?.audioTrack || undefined
                            }
                        />
                    ))}
                </div> */
