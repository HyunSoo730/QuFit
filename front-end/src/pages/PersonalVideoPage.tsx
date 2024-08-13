import ParticipantVideo from '@components/video/ParticipantVideo';
import { useRoomParticipantsStore } from '@stores/video/roomStore';

const PersonalVideoPage = () => {
    const participants = useRoomParticipantsStore();
    console.log(participants);
    return (
        <div>
            <ParticipantVideo roomMax={4} gender="m" />
            <ParticipantVideo roomMax={4} gender="f" />
        </div>
    );
};

export default PersonalVideoPage;
