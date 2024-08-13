import { CheckboxProvider } from '@components/common/checkbox/CheckboxContext';
import { ReactNode } from 'react';

export interface CheckboxGroupProps {
    children: ReactNode;
    className?: string;
    values: string[];
    onChange: (values: string[]) => void;
    name?: string;
    label?: string;
}

const CheckboxGroup = ({ label, children, className, values, onChange, name }: CheckboxGroupProps) => {
    const isChecked = (value: string) => values.includes(value);

    const toggleValue = ({ checked, value }: { checked: boolean; value: string }) => {
        if (checked) {
            onChange([...values, value]);
        } else {
            onChange(values.filter((v) => v !== value));
        }
    };

    return (
        <fieldset className={className} name={name}>
            <legend className="text-4xl">{label}</legend>
            <CheckboxProvider value={{ isChecked, toggleValue }}>{children}</CheckboxProvider>
        </fieldset>
    );
};

export default CheckboxGroup;
