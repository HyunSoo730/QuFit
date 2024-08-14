import { useRoomMaxStore, useRoomParticipantsStore, useSetRoomIdStore } from '@stores/video/roomStore';
import useRoom from '@hooks/useRoom';
import ParticipantVideo from '@components/video/ParticipantVideo';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { afterSubscribe, connect, disConnect, publishSocket } from '@utils/websocketUtil';
import * as StompJs from '@stomp/stompjs';
import MeetingStartButton from '@components/game/MeetingStartButton';
import { PATH } from '@routers/PathConstants';

const VideoWaitPage = () => {
    // const roomMax = useRoomMaxStore();
    const roomMax = 8;
    const [isMeetingStart, setIsMettingStart] = useState(false);
    const participants = useRoomParticipantsStore();
    const { leaveRoom } = useRoom();
    const { roomId } = useParams();
    const setRoomId = useSetRoomIdStore();
    const client = useRef<StompJs.Client | null>(null);
    const navigate = useNavigate();
    const onConnect = () => {
        client.current?.subscribe(`/sub/game/${roomId}`, (message) => {
            const response = JSON.parse(message.body);

            afterSubscribe(response, '미팅룸 시작을 성공했습니다.', () => {
                setIsMettingStart(true);
            });
        });
    };

    const startMeeting = () => {
        publishSocket(
            {
                isRoomStart: true,
            },
            client,
            Number(roomId),
        );
    };

    useEffect(() => {
        setRoomId(Number(roomId)); //나중에 param에서 따와야함
        connect(client, onConnect);
        return () => disConnect(client);
    }, []);

    return (
        <>
            <div className="flex flex-col justify-between w-full h-screen ">
                <ParticipantVideo roomMax={roomMax!} gender="m" status="wait" participants={participants} />
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="flex flex-col gap-4">
                        <button onClick={() => leaveRoom(Number(roomId))}>나가기</button>
                    </div>
                    <MeetingStartButton
                        onNext={() => {
                            navigate(PATH.GROUP_VIDEO(Number(roomId)));
                        }}
                        isStart={isMeetingStart}
                        onClick={startMeeting}
                    />
                </div>
                <ParticipantVideo participants={participants} roomMax={roomMax!} gender="f" status="wait" />
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
