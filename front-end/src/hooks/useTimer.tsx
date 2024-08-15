import { useEffect, useState } from 'react';

export interface TimerProps {
    endSec: number;
    afterFunc: () => void;
}
const useTimer = (endSec: number, afterFunc: () => void) => {
    const [restSec, setRestSec] = useState(endSec);
    useEffect(() => {
        const timer = setInterval(() => {
            setRestSec((prev: number) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (restSec === 0) afterFunc();
    }, [restSec]);

    return restSec;
};

export default useTimer;
