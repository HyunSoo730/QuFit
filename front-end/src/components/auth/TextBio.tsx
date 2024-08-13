import { ChangeEvent, InputHTMLAttributes } from 'react';

interface TextBioProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
}
const TextBio = ({ label, onChange, name, value, rows, ...rest }: TextBioProps) => {
    return (
        <label className="relative w-full">
            {label && (
                <label
                    htmlFor={name}
                    className={`absolute left-5 px-2 font-semibold transition-all duration-300 ${
                        value
                            ? 'top-0 bg-white text-pink transform -translate-y-1/2'
                            : 'top-1/2 text-black/30 transform -translate-y-1/2'
                    }`}
                >
                    {label}
                </label>
            )}{' '}
            <textarea
                className="w-full h-20 px-5 py-5 bg-transparent border-2 rounded-md outline-none border-black/30 text-black/50 placeholder:text-transparent focus:border-pink lg:h-18 md:h-18 md:text-xs md:pr-15 sm:h-15 sm:text-xs sm:pr-10 xs:h-15 xs:text-sm xs:pr-10"
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                {...rest}
            ></textarea>
        </label>
    );
};

export default TextBio;
