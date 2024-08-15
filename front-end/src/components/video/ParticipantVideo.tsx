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
        <div className="flex justify-center w-full gap-1"> {/* gap-4로 각 비디오 간의 간격을 조정 */}
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
                            className="w-1/4 min-w-[250px] max-w-[350px] h-auto flex-grow-0 flex-shrink-0"
                            style={{ minHeight: '500px', maxHeight: '500px' }} // 고정된 높이와 최소/최대 너비 설정
                        >
                            <VideoComponent
                                roomMax={roomMax}
                                key={participant.id}
                                id={participant.id}
                                track={videoTrack}
                                isManager={participant.id === hostId}
                                participateName={participant.nickname!}
                                faceLandmarkerReady={participant.faceLandmarkerReady}
                                faceLandmarker={participant.faceLandmarker}
                                status={status}
                                participantOrder={index} // 참가자 순서 전달
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
                        className="w-1/4 min-w-[250px] max-w-[350px] h-auto flex-grow-0 flex-shrink-0"
                        style={{ minHeight: '250px', maxHeight: '350px' }} // 빈 비디오 컨테이너에도 동일한 높이 설정
                    >
                        <EmptyVideo key={index} />
                    </div>
                ))}
        </div>
    );
    
    
    
};

export default ParticipantVideo;
