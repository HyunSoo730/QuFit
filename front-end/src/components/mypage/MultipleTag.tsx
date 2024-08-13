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
            className="flex group bg-opacity-50 items-center h-5 bg-white justify-center mb-2 mr-1.5 border-none rounded-2xl has-[:checked]:bg-opacity-70 has-[:checked]:bg-pink hover:bg-pink hover:bg-opacity-60 px-3.5 py-3.5 lg:h-1 lg:mr-3"
            {...rest}
        >
            <span className="z-10 text-xs text-left text-white truncate">
                #{children}
            </span>
        </Checkbox>
    );
};

export default MultipleTag;
