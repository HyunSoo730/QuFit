import { CheckboxContext } from '@components/common/checkbox/CheckboxContext';
import { ReactNode, useContext } from 'react';

export interface CheckboxProps {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    value: string;
    checked?: boolean;
    onChange?: (value: string) => void;
}
const Checkbox = ({ children, className, disabled, value, checked, onChange }: CheckboxProps) => {
    const context = useContext(CheckboxContext);

    if (!context) {
        return (
            <label className={className}>
                <input
                    type="checkbox"
                    className="hidden peer"
                    disabled={disabled}
                    checked={checked}
                    onChange={(event) => onChange?.(event.target.value)}
                />
            </label>
        );
    }
    const { isChecked, toggleValue } = context;
    return (
        <label className={className}>
            <input
                type="checkbox"
                disabled={disabled}
                checked={isChecked(value)}
                onChange={(event) => toggleValue({ checked: event.target.checked, value })}
                className="hidden peer"
            />
            {children}
        </label>
    );
};

export default Checkbox;
