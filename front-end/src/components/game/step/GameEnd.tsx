interface GameEndProps {
    restSec: number;
}
import playGame from '@assets/gif/playGame.gif';
const GameEnd = ({ restSec }: GameEndProps) => {
    const minutes = String(Math.floor(restSec / 60)).padStart(2, '0');
    const second = String(Math.floor(restSec % 60)).padStart(2, '0');

    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg opacity-0 item-center">
                <img src={playGame} alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>
            <p className="absolute text-3xl font-bold text-white ">
                Please stick around for: &nbsp; {minutes}분 {second}초
            </p>
        </div>
    );
};

export default GameEnd;
