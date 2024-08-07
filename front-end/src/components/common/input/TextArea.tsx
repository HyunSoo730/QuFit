import { ChangeEvent, InputHTMLAttributes } from 'react';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
}
const TextArea = ({ label, onChange, name, value, rows, ...rest }: TextAreaProps) => {
    return (
        <label className="flex flex-col gap-3">
            {label && <p className="text-3xl">{label}</p>}
            <textarea
                className="relative w-full px-4 py-8 pr-20 bg-transparent border-4 outline-none resize-none rounded-3xl border-lightPurple-3 effect-purePink pl-7 placeholder:text-white placeholder:opacity-80 lg:h-12 md:h-20 md:text-xl md:pr-24 sm:h-20 sm:text-xl sm:pr-24 xs:h-20 xs:text-xl xs:pr-24"
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                {...rest}
            ></textarea>
        </label>
    );
};

export default TextArea;
