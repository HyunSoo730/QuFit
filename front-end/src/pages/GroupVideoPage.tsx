import VideoComponent from '@components/video/VideoComponent';
import AudioComponent from '@components/video/AudioComponent';
import EmptyVideo from '@components/video/EmptyVideo';
import { useRoomManagerNameStore, useRoomParticipantsStore } from '@stores/video/roomStore';
import GameStartButton from '@components/video/GameStartButton';

import { GROUP_VIDEO_END_SEC } from '@components/video/VideoConstants';
import { PATH } from '@routers/PathConstants';
import VideoTimer from '@components/video/GroupVideoTimer';
import useRoom from '@hooks/useRoom';

function GroupVideoPage() {
    const roomMax = 8;
    let maleIdx = 0;
    let femaleIdx = 0;
    const managerName = useRoomManagerNameStore();
    const participants = useRoomParticipantsStore();
    const { createRoom, joinRoom, leaveRoom } = useRoom();
    const roomId = 124;

    const handleTimerEnd = () => {
        location.href = PATH.PERSONAL_VIDEO(1);
    };
    return (
        <>
            <div className="flex flex-col items-center justify-between w-full h-screen">
                <div className="flex w-full gap-4">
                    {participants.map((participant) => {
                        maleIdx++;
                        return (
                            participant.gender === 'm' && (
                                <VideoComponent
                                    key={participant.nickname}
                                    track={
                                        participant.info.videoTrackPublications.values().next().value?.videoTrack ||
                                        undefined
                                    }
                                    isManager={participant.nickname === managerName}
                                    participateName={participant.nickname!}
                                />
                            )
                        );
                    })}
                    {Array(roomMax / 2 - maleIdx)
                        .fill(0)
                        .map(() => (
                            <EmptyVideo />
                        ))}
                </div>
                <div>
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

                    <VideoTimer
                        endSec={GROUP_VIDEO_END_SEC}
                        afterFunc={() => {
                            handleTimerEnd();
                        }}
                    />
                    <GameStartButton />
                </div>
                <div className="flex w-full gap-4">
                    {participants.map((participant) => {
                        femaleIdx++;
                        return (
                            participant.gender === 'f' && (
                                <VideoComponent
                                    key={participant.nickname}
                                    track={
                                        participant.info.videoTrackPublications.values().next().value?.videoTrack ||
                                        undefined
                                    }
                                    isManager={participant.nickname === managerName}
                                    participateName={participant.nickname!}
                                />
                            )
                        );
                    })}
                    {Array(roomMax / 2 - femaleIdx)
                        .fill(0)
                        .map(() => (
                            <EmptyVideo />
                        ))}
                </div>
                <div className="hidden">
                    {participants.map((participant) => (
                        <AudioComponent
                            key={participant.nickname}
                            track={
                                participant.info.audioTrackPublications.values().next().value?.audioTrack || undefined
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default GroupVideoPage;
