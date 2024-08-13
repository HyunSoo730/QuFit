import Choice from '@components/game/Choice';
import ChoiceGroup from '@components/game/ChoiceGroup';
import ChoiceTimer from '@components/game/ChoiceTimer';
import TypingText from '@components/game/TypingText';
import { useRoomIdStore } from '@stores/video/roomStore';
import { useState } from 'react';

interface GamePlayProps {
    onNext: (choice: any) => void;
    title: string;
    scenario1: string;
    scenario2: string;
    id: number;
}
const GamePlay = ({ id, title, scenario1, scenario2, onNext }: GamePlayProps) => {
    const [nextSentence, setNextSentence] = useState(false);
    const [answer, setAnswer] = useState('0');
    const [startTimer, setStartTimer] = useState(false);
    const roomId = useRoomIdStore();
    const handleTimerEnd = () => {
        const data = {
            balanceGameId: id,
            videoRoomId: roomId,
            answer: Number(answer),
        };
        console.log(data);
        onNext(data);
    };

    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg item-center">
                <img src="/src/assets/gif/밸런스게임중.gif" alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>
            {startTimer && (
                <div className="absolute top-[2rem] left-[2rem] ">
                    <ChoiceTimer onEnd={handleTimerEnd} />
                </div>
            )}

            <div className="absolute bottom-[1.5rem] gap-[1rem] flex flex-col w-[calc(100%-5rem)] p-[2rem] bg-black opacity-50 min-h-[10rem]">
                <TypingText
                    frame={50}
                    text={'[밸런스의 마법사]  '}
                    afterFunc={() => {
                        setNextSentence(true);
                    }}
                    className="w-full text-xl font-bold text-white"
                />
                {nextSentence && (
                    <TypingText
                        frame={80}
                        text={title + '  '}
                        afterFunc={() => {
                            setStartTimer(true);
                        }}
                        className="w-full text-lg text-white"
                    />
                )}

                {startTimer && (
                    <ChoiceGroup value={answer} onChange={(e) => setAnswer(e.target.value)} name={''}>
                        <Choice value={'1'}>{scenario1}</Choice>
                        <Choice value={'2'}>{scenario2}</Choice>
                    </ChoiceGroup>
                )}
            </div>
        </div>
    );
};

export default GamePlay;
