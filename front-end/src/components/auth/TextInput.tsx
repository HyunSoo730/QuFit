import { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ label, name, value, onChange, ...rest }: InputProps) => {

    return (
        <div className="relative w-full">
            {label && (
                <label
                    htmlFor={name}
                    className={`absolute left-5 px-2 text-lg font-semibold transition-all duration-300 ${
                        value ? 'top-0 bg-white text-pink transform -translate-y-1/2' : 'top-2/4 text-black/30 transform -translate-y-2/4'
                    }`}
                >
                    {label}
                </label>
            )}
            <input
                id={name}
                className="w-full h-12 pl-5 bg-transparent border-2 rounded-md outline-none border-black/30 text-black/50 placeholder:text-transparent focus:border-pink lg:h-12 md:h-12 md:text-xs md:pr-15 sm:h-12 sm:text-xs sm:pr-10 xs:h-12 xs:text-sm xs:pr-10"
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </div>
    );
};

export default TextInput;
