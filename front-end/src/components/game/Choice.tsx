import Radio from '@components/common/radio/Radio';
import { ReactNode } from 'react';
interface ChoiceProps {
    children: ReactNode;
    value: string;
}
const Choice = ({ children, value, ...rest }: ChoiceProps) => {
    return (
        <Radio
            value={value}
            className="flex  opacity-90 p-2 items-center text-xl  text-white justify-center   hover:border-lightPurple-6  has-[:checked]:bg-lightPurple-2 has-[:checked]:animate-pulse"
            {...rest}
        >
            {children}
        </Radio>
    );
};

export default Choice;
