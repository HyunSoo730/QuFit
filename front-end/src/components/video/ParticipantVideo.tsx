// ParticipantVideo.tsx
import EmptyVideo from '@components/video/EmptyVideo';
import VideoComponent from '@components/video/VideoComponent';
import useRoom from '@hooks/useRoom';
import { RoomParticipant } from '@stores/video/roomStore';

interface ParticipantVideoProps {
    roomMax: number;
    gender: 'f' | 'm';
    status: 'wait' | 'meeting';
    participants: RoomParticipant[];
}

const ParticipantVideo = ({ roomMax, gender, status, participants }: ParticipantVideoProps) => {
    let numPeople = 0;
    const { hostId } = useRoom();

    return (
        <div className="flex justify-center w-full gap-1 ">
            {participants.map((participant, index) => {
                if (participant.gender === gender) {
                    const videoTrack =
                        participant.info!.videoTrackPublications.values().next().value?.videoTrack || undefined;

                    // 비디오 트랙이 없을 경우 렌더링을 하지 않음
                    if (!videoTrack) {
                        console.warn(
                            'ParticipantVideo: 비디오 트랙이 설정되지 않았습니다 - 참가자 이름:',
                            participant.nickname,
                        );
                        return null;
                    }

                    numPeople++;
                    return (
                        <VideoComponent
                            roomMax={roomMax}
                            key={participant.id} // participant.nickname에서 participant.id로 변경하여 고유성을 보장
                            id={participant.id}
                            track={videoTrack}
                            isManager={participant.id === hostId}
                            participateName={participant.nickname!}
                            faceLandmarkerReady={participant.faceLandmarkerReady}
                            faceLandmarker={participant.faceLandmarker}
                            status={status}
                            participantOrder={index} // 참가자 순서 전달
                        />
                    );
                }
                return null;
            })}
            {Array(roomMax / 2 - numPeople)
                .fill(0)
                .map((_, index) => (
                    <EmptyVideo key={index} />
                ))}
        </div>
    );
};

export default ParticipantVideo;
