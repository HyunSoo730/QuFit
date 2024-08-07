import { useState } from 'react';
import animateData from '@assets/lottie/heart button.json';
import LottieComponent from '@components/common/LottieComponent';
import useRoom from '@hooks/useRoom';

const GameStartButton = () => {
    const [isStart, setIsStart] = useState(false);
    const { isManager } = useRoom();

    const gameStart = () => {
        if (isManager) {
            setIsStart(true);
        }
    };
    return (
        <div className="relative flex flex-col items-center">
            <div className="flex gap-8 bg-black group" onClick={gameStart}>
                {!isStart ? (
                    <LottieComponent
                        animationData={animateData}
                        speed={0.5}
                        isPaused={false}
                        isStopped={false}
                        loop={false}
                        init={0}
                        end={86}
                        className="w-[20rem] animate-pulse"
                    />
                ) : (
                    <LottieComponent
                        animationData={animateData}
                        speed={0.3}
                        isPaused={false}
                        isStopped={false}
                        loop={true}
                        init={86}
                        className="w-[20rem]"
                    />
                )}
            </div>

            {!isStart && (
                <p className="absolute text-lg text-white -bottom-5">
                    {isManager ? '미팅을 시작하려면 버튼을 눌러주세요' : '잠시후 미팅이 시작됩니다. 기다려주세요!'}
                </p>
            )}
        </div>
    );
};

export default GameStartButton;
