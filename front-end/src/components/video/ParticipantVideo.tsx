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
        <div className="flex justify-center w-full gap-2 h-full"> {/* 높이를 100%로 설정 */}
            {participants.map((participant, index) => {
                if (participant.gender === gender) {
                    const videoTrack =
                        participant.info!.videoTrackPublications.values().next().value?.videoTrack || undefined;
    
                    if (!videoTrack) {
                        console.warn(
                            'ParticipantVideo: 비디오 트랙이 설정되지 않았습니다 - 참가자 이름:',
                            participant.nickname,
                        );
                        return null;
                    }
    
                    numPeople++;
                    return (
                        <div
                            className="w-1/4 min-w-[200px] max-w-[300px] h-full" // 높이를 100%로 설정
                            key={participant.id}
                        >
                            <VideoComponent
                                roomMax={roomMax}
                                id={participant.id}
                                track={videoTrack}
                                isManager={participant.id === hostId}
                                participateName={participant.nickname!}
                                faceLandmarkerReady={participant.faceLandmarkerReady}
                                faceLandmarker={participant.faceLandmarker}
                                status={status}
                                participantOrder={index}
                            />
                        </div>
                    );
                }
                return null;
            })}
            {Array(roomMax / 2 - numPeople)
                .fill(0)
                .map((_, index) => (
                    <div
                        className="w-1/4 min-w-[200px] max-w-[300px] h-full" // 높이를 100%로 설정
                        key={`empty-${index}`}
                    >
                        <EmptyVideo />
                    </div>
                ))}
        </div>
    );
    
    
    
};

export default ParticipantVideo;
