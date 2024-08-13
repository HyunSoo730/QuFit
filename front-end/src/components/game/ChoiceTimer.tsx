import { GameHeartIcon } from '@assets/svg/video';
import { CHOICE_TIMER } from '@components/game/Constants';
import useTimer from '@hooks/useTimer';

interface ChoiceTimerProps {
    onEnd: () => void;
}

const ChoiceTimer = ({ onEnd }: ChoiceTimerProps) => {
    const restSec = useTimer(CHOICE_TIMER, onEnd);
    // console.log(restSec);
    return (
        <div className="flex">
            <GameHeartIcon className="z-20" width={'2.625rem'} />
            <div className="absolute w-[20rem] border-4 left-[2rem]  top-1/2 -translate-y-1/2 border-purple flex">
                <div className="h-4 bg-pink animate-choice" />
            </div>
        </div>
    );
};

export default ChoiceTimer;
