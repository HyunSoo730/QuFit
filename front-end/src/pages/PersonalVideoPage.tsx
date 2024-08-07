import VideoTimer from '@components/video/GroupVideoTimer';
import { PERSONAL_VIDEO_END_SEC } from '@components/video/VideoConstants';
import { PATH } from '@routers/PathConstants';

const PersonalVideoPage = () => {
    return (
        <div>
            <VideoTimer
                endSec={PERSONAL_VIDEO_END_SEC}
                afterFunc={() => {
                    location.href = PATH.ROOT;
                }}
            />
        </div>
    );
};

export default PersonalVideoPage;
