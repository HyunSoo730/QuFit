import { ChangeEvent, InputHTMLAttributes } from 'react';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    isUpdate: boolean;
}
const TextArea = ({ label, onChange, name, value, rows, isUpdate, ...rest }: TextAreaProps) => {
    return (
        <label className="flex flex-col gap-1">
            {label && <p className="font-semibold text-white text-l">{label}</p>}
            <textarea
                className="relative w-full h-10 px-5 py-8 text-white bg-transparent border-2 border-white outline-none resize-none text-md border-t-transparent border-r-transparent border-l-transparent scrollbar-hide placeholder:text-white placeholder:opacity-80 lg:h-12 md:h-20 md:text-sm md:pr-5 sm:h-15 sm:text-xs sm:pr-5 xs:h-15 xs:text-xs xs:pr-5"
                name={name}
                value={value}
                onChange={isUpdate ? onChange : undefined}
                disabled={!isUpdate}
                rows={rows}
                {...rest}
            ></textarea>
        </label>
    );
};

export default TextArea;
