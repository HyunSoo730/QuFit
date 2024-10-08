import React, { useContext } from 'react';
import { RadioContext } from '@components/common/radio/RadioStoreContext';

interface RadioProps {
    children: React.ReactNode;
    value: string;
    className?: string;
    disabled?:boolean;
}

const Radio = ({ children, value, className, disabled }: RadioProps) => {
    const context = useContext(RadioContext);

    if (!context) {
        throw new Error('Radio must be used within a RadioStoreProvider');
    }

    const { value: selectedValue, onChange } = context;

    return (
        <label className={className}>
            <input
                className="hidden peer"
                type="radio"
                value={value}
                checked={value === selectedValue}
                onChange={ onChange }
                disabled={disabled}
            />
            {children}
        </label>
    );
};

export default Radio;
