import RadioGroup from '@components/common/radio/RadioGroup';
import { useState, ChangeEvent, ReactNode } from 'react';

interface SingleTagGroupProps {
    label?: string;
    children: ReactNode;
    className?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

const SingleTagGroup = ({ label, children, value, onChange, ...rest }: SingleTagGroupProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="flex flex-col gap-3">
            <p className="font-semibold text-white text-l"
            onClick={handleToggle}>
                {label}</p>
            {isOpen && (
                <RadioGroup value={value} onChange={onChange} className="flex flex-wrap " {...rest}>
                {children}
            </RadioGroup>
              )}
        </div>
    );
};

export default SingleTagGroup;
