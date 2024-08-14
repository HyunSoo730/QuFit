import { HeartTimer } from '@assets/svg';
import { PERSONAL_VIDEO_END_SEC } from '@components/game/Constants';
import useTimer from '@hooks/useTimer';

const PersonalVideoTimer = () => {
    const restsec = useTimer(PERSONAL_VIDEO_END_SEC, () => console.log('타이머 종료'));

    return (
        <div className="w-[33rem] bg-gray-900 ">
            {/* 시간 표시 */}
            <div className="flex items-center justify-center p-2 text-xl font-bold text-white rounded-bl">
                {restsec > 0 && Math.floor(restsec / 60)}:{String(restsec % 60).padStart(2, '0')}
            </div>

            <div className="relative flex w-full h-4">
                <HeartTimer width={'3rem'} className="absolute left-0 z-20 -translate-x-1/2 -translate-y-1/4" />
                <div className="absolute w-full h-4 bg-smokeWhite bg-opacity-30">
                    <div className="h-4 bg-pink animate-private" />
                </div>
            </div>
        </div>
    );
};

export default PersonalVideoTimer;
