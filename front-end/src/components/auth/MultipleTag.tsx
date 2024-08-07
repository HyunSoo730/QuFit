import Checkbox from '@components/common/checkbox/Checkbox';
import { ReactNode } from 'react';

interface MultipleTagProps {
    children: ReactNode;
    value: string;
}

const MultipleTag = ({ children, value, ...rest }: MultipleTagProps) => {
    return (
        <Checkbox
            value={value}
            className="flex group items-center text-xl border-lightPurple-3 effect-purePink opacity-90 rounded-lg  bg-white justify-center mb-2 mr-3 border-none   hover:border-lightPurple-6 has-[:checked]:border-lightPurple-6 has-[:checked]:effect-hotPink hover:effect-hotPink px-12 py-7 h-7 lg:px-4 lg:h-6 lg:mr-1.5"
            {...rest}
        >
            <span className="z-10 font-medium text-left peer-[:checked]:text-white group-hover:text-white truncate lg:text-sm">
                {children}
            </span>
        </Checkbox>
    );
};

export default MultipleTag;
