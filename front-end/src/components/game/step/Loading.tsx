import { LOADING_SEC } from '@components/game/Constants';
import useTimer from '@hooks/useTimer';
import playGame from '@assets/gif/playGame.gif';
interface LoadingProps {
    onNext: () => void;
}
const Loading = ({ onNext }: LoadingProps) => {
    useTimer(LOADING_SEC, onNext);
    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg opacity-0 item-center">
                <img src={playGame} alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>
            <p className="absolute text-3xl font-bold text-white animate-pulse">Loading...</p>
        </div>
    );
};

export default Loading;
