import SvgTimerIcon from '@assets/svg/video/TimerIcon';
import useTimer, { TimerProps } from '@hooks/useTimer';

const VideoTimer = ({ endSec, afterFunc }: TimerProps) => {
    const restSec = useTimer(endSec, afterFunc);
    const minutes = String(Math.floor(restSec / 60)).padStart(2, '0');
    const second = String(Math.floor(restSec % 60)).padStart(2, '0');

    return (
        <section className="flex items-center gap-4 py-4">
            <SvgTimerIcon width={17} height={20} />
            <div className="flex gap-2">
                <p>{minutes}분</p>
                <p>{second}초</p>
            </div>
        </section>
    );
};

export default VideoTimer;
