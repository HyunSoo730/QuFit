import { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, value, onChange, ...rest }: InputProps) => {
    return (
        <label className="flex flex-col gap-3">
            {label && <p className="text-3xl">{label}</p>}
            <input
                className="relative w-full pr-20 bg-transparent border-4 rounded-full outline-none h-14 border-lightPurple-3 effect-purePink pl-7 placeholder:text-white placeholder:opacity-80 lg:h-12 md:h-20 md:text-xl md:pr-24 sm:h-20 sm:text-xl sm:pr-24 xs:h-20 xs:text-xl xs:pr-24"
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </label>
    );
};

export default Input;
