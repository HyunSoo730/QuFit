import useTimer, { TimerProps } from '@hooks/useTimer';

const GameTimer = ({ endSec, afterFunc }: TimerProps) => {
    const restSec = useTimer(endSec, afterFunc);
    const second = String(Math.floor(restSec % 60));

    return (
        <section className="flex items-center gap-4 py-4">
            <div className="flex gap-2">
                <p>{second}</p>
            </div>
        </section>
    );
};

export default GameTimer;
