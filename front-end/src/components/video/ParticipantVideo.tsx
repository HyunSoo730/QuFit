import EmptyVideo from '@components/video/EmptyVideo';
import VideoComponent from '@components/video/VideoComponent';
import useMember from '@hooks/useMember';
import useRoom from '@hooks/useRoom';
import { useRoomParticipantsStore } from '@stores/video/roomStore';

interface ParticipantVideoProps {
    roomMax: number;
    gender: 'f' | 'm';
}
const ParticipantVideo = ({ roomMax, gender }: ParticipantVideoProps) => {
    let numPeople = 0;
    const participants = useRoomParticipantsStore();
    const { hostId } = useRoom();
    const { member } = useMember();

    return (
        <div className="flex justify-center w-full gap-1 lg:gap-3 2xl:gap-4">
            {participants.map((participant) => {
                if (participant.gender === gender) {
                    numPeople++;
                    return (
                        <VideoComponent
                            key={participant.nickname}
                            id={member?.memberId}
                            track={
                                participant.info!.videoTrackPublications.values().next().value?.videoTrack || undefined
                            }
                            isManager={participant.id === hostId}
                            participateName={participant.nickname!}
                            faceLandmarkerReady={participant.faceLandmarkerReady} // 추가
                        />
                    );
                }
            })}
            {Array(roomMax / 2 - numPeople)
                .fill(0)
                .map(() => (
                    <EmptyVideo />
                ))}
        </div>
    );
};

export default ParticipantVideo;
