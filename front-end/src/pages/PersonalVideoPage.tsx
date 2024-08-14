import ParticipantVideo from '@components/video/ParticipantVideo';
import PersonalVideoTimer from '@components/video/PersonalVideoTimer';
import { usePrivateParticipantsStore, useRoomParticipantsStore } from '@stores/video/roomStore';

const PersonalVideoPage = () => {
    const participants = useRoomParticipantsStore();
    const privateParticipants = usePrivateParticipantsStore();

    console.log(participants);
    console.log(privateParticipants);
    return (
        <div className="flex flex-col items-start gap-4">
            <PersonalVideoTimer />
            <ParticipantVideo roomMax={2} gender="m" participants={privateParticipants} status={'meeting'} />

            <ParticipantVideo roomMax={2} gender="f" participants={privateParticipants} status={'meeting'} />
        </div>
    );
};

export default PersonalVideoPage;
