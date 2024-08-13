import { ChangeEvent, ReactNode } from 'react';
import { RadioProvider } from '@components/common/radio/RadioStoreContext';

interface RadioGroupProps {
    label?: string;
    children: ReactNode;
    className?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

const RadioGroup = ({ label, children, className, value, onChange, name }: RadioGroupProps) => {
    return (
        <fieldset name={name} className={className}>
            <legend className="my-5">{label}</legend>
            <RadioProvider value={{ value, onChange }}>{children}</RadioProvider>
        </fieldset>
    );
};

export default RadioGroup;
