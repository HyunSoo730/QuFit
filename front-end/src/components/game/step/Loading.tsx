import { LOADING_SEC } from '@components/game/Constants';
import useTimer from '@hooks/useTimer';

interface LoadingProps {
    onNext: () => void;
}
const Loading = ({ onNext }: LoadingProps) => {
    const restSec = useTimer(LOADING_SEC, onNext);
    // console.log(restSec);
    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg opacity-0 item-center">
                <img src="/src/assets/gif/밸런스게임중.gif" alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>
            <p className="absolute text-3xl font-bold text-white animate-pulse">Loading...</p>
            {/* <TypingText frame={50} text={'[밸런스의 마법사]  '} className="w-full text-xl font-bold text-white" /> */}
        </div>
    );
};

export default Loading;
