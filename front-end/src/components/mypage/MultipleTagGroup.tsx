import CheckboxGroup from '@components/common/checkbox/CheckboxGroup';
import { useState, ReactNode } from 'react';

interface MultipleTagGroupProps {
    children: ReactNode;
    values: string[];
    onChange: (values: string[]) => void;
    name?: string;
    label?: string;
}

const MultipleTagGroup = ({ label, children, values, onChange, ...rest }: MultipleTagGroupProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="flex flex-col gap-3">
            <p className="font-semibold text-white text-l"
            onClick={handleToggle}
            >{label}</p>
            {isOpen && (
                <CheckboxGroup values={values} onChange={onChange} className="flex flex-wrap " {...rest}>
                {children}
            </CheckboxGroup>
            )}
        </div>
    );
};

export default MultipleTagGroup;
