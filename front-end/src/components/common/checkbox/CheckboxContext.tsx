import { createContext, ReactNode } from 'react';

interface CheckboxContextProps {
    isChecked: (value: string) => boolean;
    toggleValue: ({ checked, value }: { checked: boolean; value: string }) => void;
}

const CheckboxContext = createContext<CheckboxContextProps | null>(null);

interface ProviderProps {
    children: ReactNode;
    value: CheckboxContextProps;
}

const CheckboxProvider = ({ children, value }: ProviderProps) => {
    return <CheckboxContext.Provider value={value}>{children}</CheckboxContext.Provider>;
};

export { CheckboxContext, CheckboxProvider };
