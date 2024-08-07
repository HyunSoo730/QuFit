import CheckboxGroup from '@components/common/checkbox/CheckboxGroup';
import { ReactNode } from 'react';

interface MultipleTagGroupProps {
    children: ReactNode;
    values: string[];
    onChange: (values: string[]) => void;
    name?: string;
    label?: string;
}

const MultipleTagGroup = ({ label, children, values, onChange, ...rest }: MultipleTagGroupProps) => {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-3xl">{label}</p>
            <CheckboxGroup values={values} onChange={onChange} className="flex flex-wrap " {...rest}>
                {children}
            </CheckboxGroup>
        </div>
    );
};

export default MultipleTagGroup;
