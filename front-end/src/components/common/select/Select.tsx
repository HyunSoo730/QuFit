import { ChangeEvent, SelectHTMLAttributes  } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string, label: string }>;
}

const Select = ({ label, name, value, onChange, options, ...rest }: SelectProps) => {
    return (
        <label className="flex flex-col gap-3">
            {label && <p className="font-semibold text-white text-l">{label}</p>}
            <select
                className="relative w-full mr-3 text-sm text-center text-white bg-white bg-opacity-50 border-none h-7 rounded-xl focus:outline-none"
                name={name}
                value={value}
                onChange={onChange}    
                {...rest}
            >
            {options.map((option) => (
                <option
                className="text-xs text-white bg-black bg-opacity-50"
                key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            </select>
        </label>
    );
};

export default Select;
