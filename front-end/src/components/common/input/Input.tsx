import { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, value, onChange, ...rest }: InputProps) => {
    return (
        <label className="flex flex-col gap-1">
            {label && <p className="font-semibold text-white text-l">{label}</p>}
            <input
                className="relative w-full h-10 pl-5 text-white bg-transparent border-2 border-white outline-none text-md border-t-transparent border-r-transparent border-l-transparent placeholder:text-white placeholder:opacity-80 focus:ring-pink lg:h-10 md:h-10 md:text-xs md:pr-15 sm:h-10 sm:text-xs sm:pr-10 xs:h-10 xs:text-sm xs:pr-10"
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </label>
    );
};

export default Input;
