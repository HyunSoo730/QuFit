import { NextIcon } from '@assets/svg/video';
import TypingText from '@components/video/TypingText';
import { useState } from 'react';

interface BalanceGameProps {
    onNext: () => void;
}

const BalanceGame = ({ onNext }: BalanceGameProps) => {
    const [nextSentence, setNextSentence] = useState(false);
    const [icon, setIcon] = useState(false);
    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg item-center">
                <img src="/src/assets/gif/밸런스게임중.gif" alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>

            <div className="absolute bottom-[1.5rem] gap-[1rem] flex flex-col w-[calc(100%-5rem)] p-[2rem] bg-black opacity-50 min-h-[13rem]">
                <TypingText
                    frame={50}
                    text={'[밸런스의 마법사]  '}
                    afterFunc={() => setNextSentence(true)}
                    className="w-full text-xl font-bold text-white"
                />
                {nextSentence && (
                    <TypingText
                        frame={80}
                        text={
                            '안녕! 난 밸런스의 마법사야. 여기서 너의 선택이 사랑으로 이어질지도 몰라. 각선택이 너의 인연을 가깝게 할 거야. 그럼, 준비됐지? 사랑을 찾아볼까?  '
                        }
                        afterFunc={() => setIcon(true)}
                        className="w-full text-lg text-white"
                    />
                )}
                {icon && (
                    <div className="flex items-center justify-end gap-1 animate-pulse" onClick={onNext}>
                        <NextIcon width={'1.5rem'} />
                        <p className="text-lg text-white ">다음으로 가기</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BalanceGame;
