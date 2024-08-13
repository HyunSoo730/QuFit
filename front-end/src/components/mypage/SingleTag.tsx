import Radio from '@components/common/radio/Radio';
import { ReactNode } from 'react';

interface SingleTagProps {
    children: ReactNode;
    value: string;
}

const SingleTag = ({ children, value, ...rest }: SingleTagProps) => {
    return (
        <Radio
            value={value}
            className="flex group bg-opacity-50 items-center h-5 bg-white justify-center mb-2 mr-1.5 border-none rounded-2xl has-[:checked]:bg-pink has-[:checked]:bg-opacity-70 hover:bg-pink hover:bg-opacity-60 px-3.5 py-3.5 lg:mr-3"
            {...rest}
        >
            <span className="z-10 text-xs text-left text-white truncate">
                #{children}
            </span>
        </Radio>
    );
};

export default SingleTag;