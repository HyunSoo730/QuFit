import ParticipantVideo from '@components/video/ParticipantVideo';
import PersonalResult from '@components/video/PersonalResult';
import PersonalVideoTimer from '@components/video/PersonalVideoTimer';
import { usePrivateParticipantsStore, useRoomParticipantsStore } from '@stores/video/roomStore';

const PersonalVideoPage = () => {
    const participants = useRoomParticipantsStore();
    const privateParticipants = usePrivateParticipantsStore();

    console.log(participants);
    console.log(privateParticipants);
    return (
        <div className="flex flex-col justify-between h-full">
            <PersonalVideoTimer />
            <div className="flex w-full">
                <ParticipantVideo roomMax={2} gender="m" participants={privateParticipants} status={'meeting'} />
                <ParticipantVideo roomMax={2} gender="f" participants={privateParticipants} status={'meeting'} />
            </div>
            <PersonalResult />
        </div>
    );
};

export default PersonalVideoPage;
