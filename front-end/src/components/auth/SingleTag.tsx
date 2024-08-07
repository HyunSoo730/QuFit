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
            className="flex group  effect-purePink opacity-90 border-lightPurple-3 effect-purePink items-center text-xl  bg-white justify-center mb-2 mr-3 border-none rounded-full  hover:border-lightPurple-6 has-[:checked]:border-lightPurple-6 has-[:checked]:effect-hotPink hover:effect-hotPink px-12 py-7 h-7 lg:px-4 lg:h-6 lg:mr-1.5"
            {...rest}
        >
            <span className="z-10 font-medium text-left peer-[:checked]:text-white group-hover:text-white truncate lg:text-sm">
                {children}
            </span>
        </Radio>
    );
};

export default SingleTag;
