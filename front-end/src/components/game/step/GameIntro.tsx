import { PlayIcon } from '@assets/svg/video';
import VideoTimer from '@components/video/GroupVideoTimer';
import useRoom from '@hooks/useRoom';
import { PATH } from '@routers/PathConstants';

interface BalanceGameIntroProps {
    onNext: () => void;
}

const GameIntro = ({ onNext }: BalanceGameIntroProps) => {
    const { isHost } = useRoom();
    const gameStart = () => {
        if (isHost) {
            onNext();
        }
    };
    return (
        <>
            <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
                <div className="flex justify-center rounded-lg item-center aspect-gameBg">
                    <img src="/src/assets/gif/밸런스게임시작전.gif" className="w-full h-full rounded-2xl" />
                </div>

                <img src="/src/assets/png/BALANCEGAME.png" className="absolute top-[8rem] left-1/2 -translate-x-1/2" />

                <button
                    onClick={gameStart}
                    className="flex items-center animate-bounce absolute bottom-[8rem] left-1/2 -translate-x-1/2"
                >
                    <PlayIcon width={'2rem'} />
                    <p className="text-2xl font-bold text-white">
                        {isHost ? 'CLICK START' : '방장이 게임을 시작할 때까지 기다려주세요.'}
                    </p>
                </button>
            </div>
        </>
    );
};

export default GameIntro;
