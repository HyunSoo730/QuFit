import ParticipantVideo from '@components/video/ParticipantVideo';
import { usePrivateParticipantsStore, useRoomParticipantsStore } from '@stores/video/roomStore';

const PersonalVideoPage = () => {
    const participants = useRoomParticipantsStore();
    const privateParticipants = usePrivateParticipantsStore();

    console.log(participants);
    console.log(privateParticipants);
    return (
        <div className="flex flex-col gap-4">
            <ParticipantVideo roomMax={4} gender="m" participants={privateParticipants} status={'meeting'} />

            <ParticipantVideo roomMax={4} gender="f" participants={privateParticipants} status={'meeting'} />
        </div>
    );
};

export default PersonalVideoPage;
