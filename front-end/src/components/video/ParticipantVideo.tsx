import EmptyVideo from '@components/video/EmptyVideo';
import VideoComponent from '@components/video/VideoComponent';
import useRoom from '@hooks/useRoom';
import { RoomParticipant, useRoomParticipantsStore } from '@stores/video/roomStore';

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
        <div className="flex justify-center w-full gap-1 lg:gap-3 2xl:gap-4">
            {participants.map((participant) => {
                if (participant.gender === gender) {
                    numPeople++;
                    return (
                        <VideoComponent
                            key={participant.nickname}
                            track={
                                participant.info!.videoTrackPublications.values().next().value?.videoTrack || undefined
                            }
                            isManager={participant.id === hostId}
                            participateName={participant.nickname!}
                            status={status}
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
