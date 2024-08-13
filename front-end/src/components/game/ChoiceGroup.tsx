import RadioGroup from '@components/common/radio/RadioGroup';
import { ChangeEvent, ReactNode } from 'react';

interface ChoiceGroupProps {
    label?: string;
    children: ReactNode;
    className?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

const ChoiceGroup = ({ label, children, value, onChange, ...rest }: ChoiceGroupProps) => {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-3xl">{label}</p>
            <RadioGroup
                value={value}
                onChange={onChange}
                className="border-2 border-white rounded-lg absolute z-100 -top-4 right-0 -translate-y-full flex flex-col items-start py-[1.5rem] gap-1 px-[1rem] bg-black opacity-50"
                {...rest}
            >
                {children}
            </RadioGroup>
        </div>
    );
};

export default ChoiceGroup;
