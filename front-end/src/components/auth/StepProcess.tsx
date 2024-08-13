import { ProcessCompleteIcon, ProcessIcon1, ProcessIcon2, ProcessIcon3, ProcessIcon4, ProcessIcon5 } from '@assets/svg';
import { useMemo } from 'react';

interface StepProcessProps {
    count: number;
}

const StepProcess = ({ count }: StepProcessProps) => {
    const steps = useMemo(
        () =>
            Array.from({ length: 5 }, (_, idx) => (
                <div className="w-5">
                    {idx < count ? (
                        <ProcessCompleteIcon />
                    ) : idx === 0 ? (
                        <ProcessIcon1 />
                    ) : idx === 1 ? (
                        <ProcessIcon2 />
                    ) : idx === 2 ? (
                        <ProcessIcon3 />
                    ) : idx === 3 ? (
                        <ProcessIcon4 />
                    ) : (
                        idx === 4 && <ProcessIcon5 />
                    )}
                </div>
            )),
        [count],
    );

    return <div className="flex items-center gap-3">{steps}</div>;
};

export default StepProcess;
