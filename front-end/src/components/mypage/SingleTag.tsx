import Radio from '@components/common/radio/Radio';
import { ReactNode } from 'react';

interface SingleTagProps {
    children: ReactNode;
    value: string;
    disabled?: boolean;
}

const SingleTag = ({ children, value, disabled, ...rest }: SingleTagProps) => {
    return (
        <Radio
            value={value}
            className={`flex items-center h-5 has-[:checked]:bg-pink/70 bg-white/50 justify-center mb-2 mr-1.5 border-none rounded-2xl px-3.5 py-3.5 lg:mr-3 group  bg-opacity-60 ${!disabled ? 'hover:bg-pink/60' : ''}`}
            disabled={disabled}
            {...rest}
        >
            <span className="z-10 text-xs text-left text-white truncate">
                #{children}
            </span>
        </Radio>
    );
};

export default SingleTag;