import animateData from '@assets/lottie/heart button.json';
import LottieComponent from '@components/common/LottieComponent';
import useRoom from '@hooks/useRoom';
import MeetingStartTimer from '@components/game/MeetingStartTimer';
import { MEETING_START_SEC } from '@components/game/Constants';

interface MeetingStartButtonProps {
    onNext: () => void;
    isStart: boolean;
    onClick: () => void;
}

const MeetingStartButton = ({ onNext, isStart, onClick }: MeetingStartButtonProps) => {
    const { isHost } = useRoom();

    const meetingStart = () => {
        if (isHost) {
            onClick();
        }
    };
    return (
        <div className="relative flex flex-col items-center">
            <div className="flex gap-8 group" onClick={meetingStart}>
                {!isStart ? (
                    <>
                        <LottieComponent
                            animationData={animateData}
                            speed={0.3}
                            isPaused={false}
                            isStopped={false}
                            loop={true}
                            init={0}
                            end={0.1}
                            className="w-[20rem]"
                        />
                        {isHost && (
                            <p className="absolute text-4xl text-white -translate-x-1/2 -translate-y-1/2 animate-pulse top-1/2 left-1/2">
                                Start
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <LottieComponent
                            animationData={animateData}
                            speed={0.5}
                            isPaused={false}
                            isStopped={false}
                            loop={true}
                            className="w-[20rem]"
                            onComplete={onNext}
                        />
                        <MeetingStartTimer endSec={MEETING_START_SEC} afterFunc={onNext} />
                    </>
                )}
            </div>

            {!isStart && (
                <p className="absolute text-lg text-white -bottom-5 animate-pulse">
                    {isHost ? '미팅을 시작하려면 버튼을 눌러주세요' : '잠시후 미팅이 시작됩니다. 기다려주세요!'}
                </p>
            )}
        </div>
    );
};

export default MeetingStartButton;
