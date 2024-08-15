import { PlayIcon } from '@assets/svg/video';
import useRoom from '@hooks/useRoom';
import beforeGame from '@assets/gif/beforeGame.gif';
import gameTitle from '@assets/png/BALANCEGAME.png';
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
                    <img src={beforeGame} className="w-full h-full rounded-2xl" />
                </div>

                <img src={gameTitle} className="absolute top-[8rem] left-1/2 -translate-x-1/2" />

                <button onClick={gameStart} className="  absolute bottom-[8rem] left-1/2 -translate-x-1/2">
                    <div className="flex items-center animate-bounce">
                        <PlayIcon width={'2rem'} />
                        <p className="text-2xl font-bold text-white">
                            {isHost ? 'CLICK START' : '방장이 게임을 시작할 때까지 기다려주세요.'}
                        </p>
                    </div>
                </button>
            </div>
        </>
    );
};

export default GameIntro;
