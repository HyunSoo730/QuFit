import { HeartTimer } from '@assets/svg';

import useTimer from '@hooks/useTimer';

interface PersonalVideoTimerProps {
    endSec: number;
    onEnd: () => void;
}

const PersonalVideoTimer = ({ endSec, onEnd }: PersonalVideoTimerProps) => {
    const restsec = useTimer(endSec, onEnd);

    return (
        <div className="w-full bg-gray-900 px-14">
            {/* 시간 표시 */}
            <div className="flex items-center justify-center p-2 text-xl font-bold text-white rounded-bl">
                {restsec > 0 && Math.floor(restsec / 60)}:{String(restsec % 60).padStart(2, '0')}
            </div>

            <div className="relative flex w-full h-10">
                <HeartTimer width={'3rem'} className="absolute left-0 z-20 -translate-x-1/2 -translate-y-1/4" />
                <div className="absolute w-full h-10 bg-smokeWhite bg-opacity-30">
                    <div className="h-10 bg-pink animate-private" />
                </div>
            </div>
        </div>
    );
};

export default PersonalVideoTimer;
