import { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isUpdate: boolean;
}

const Input = ({ label, name, value, onChange, isUpdate, ...rest }: InputProps) => {
    return (
        <label className="flex flex-col gap-1">
            {label && <p className="text-lg font-semibold text-white/70">{label}</p>}
            <input
                className="relative w-full h-10 pl-5 text-white bg-transparent border-2 outline-none border-white/50 text-md border-t-transparent border-r-transparent border-l-transparent placeholder:text-white placeholder:opacity-80 focus:ring-pink lg:h-10 md:h-10 md:text-xs md:pr-15 sm:h-10 sm:text-xs sm:pr-10 xs:h-10 xs:text-sm xs:pr-10"
                name={name}
                value={value}
                onChange={isUpdate ? onChange : undefined}
                disabled={!isUpdate}
                {...rest}
            />
        </label>
    );
};

export default Input;
