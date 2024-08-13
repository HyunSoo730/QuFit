import TypingText from '@components/game/TypingText';

import useRoom from '@hooks/useRoom';
import { useProblemsStore, useResultsStore } from '@stores/video/gameStore';

interface GameResultProps {
    onStop: () => void;
    onNext: () => void;
    id?: number;
    title: string;
    scenario1: string;
    scenario2: string;
    gameStage: number;
}

const GameResult = ({ title, onNext, scenario1, scenario2, onStop, gameStage }: GameResultProps) => {
    const { isHost } = useRoom();
    const problems = useProblemsStore();
    const results = useResultsStore();

    const countValue = (targetValue: number) => {
        const count = Object.entries(results[problems[gameStage].balanceGameId]).reduce((acc, [_, value]) => {
            //로직재작성해야함
            // console.log(value);
            // console.log(targetValue);
            // console.log(acc);
            if (value === targetValue) {
                acc++;
            }
            return acc;
        }, 0);
        return count;
    };
    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg item-center">
                <img src="/src/assets/gif/밸런스게임중.gif" alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>

            <div className="absolute bottom-[1.5rem] gap-[1rem] flex flex-col w-[calc(100%-5rem)] p-[2rem] bg-black opacity-50 min-h-[10rem]">
                <TypingText frame={50} text={title + '  '} className="w-full text-xl font-bold text-white" />
                <TypingText
                    frame={50}
                    text={scenario1 + ':  ' + countValue(1) + '명  '}
                    className="w-full text-lg text-white"
                />
                <TypingText
                    frame={50}
                    text={scenario2 + ':  ' + countValue(2) + '명  '}
                    className="w-full text-lg text-white"
                />
                <TypingText
                    frame={50}
                    text={'선택안함:  ' + countValue(0) + '명  '}
                    className="w-full text-lg text-white"
                />
                {isHost && (
                    <div className="border-2 border-white rounded-lg absolute z-100 -top-4 right-0 -translate-y-full flex flex-col items-start py-[1.5rem] gap-1 px-[1rem] bg-black opacity-50">
                        <div
                            onClick={onStop}
                            className="w-full  opacity-90 p-2 items-center text-xl  text-white justify-center   hover:bg-lightPurple-2  has-[:checked]:animate-pulse"
                        >
                            그만할래.
                        </div>
                        <div
                            onClick={onNext}
                            className="w-full   opacity-90 p-2 items-center text-xl  text-white justify-center   hover:bg-lightPurple-2  has-[:checked]:animate-pulse"
                        >
                            한번 더 하고싶어!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameResult;
