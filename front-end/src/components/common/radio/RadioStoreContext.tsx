import React, { ChangeEvent, createContext } from 'react';

interface RadioContextProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioContext = createContext<RadioContextProps | null>(null);

interface ProviderProps {
    children: React.ReactNode;
    value: RadioContextProps;
}

const RadioProvider = ({ children, value }: ProviderProps) => {
    return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>;
};

export { RadioContext, RadioProvider };
