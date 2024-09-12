import { create } from 'zustand';

interface CloseStateProps {
    isClosed: boolean;
    setIsClosed: (bool: boolean) => void;
    isThanks: boolean;
    setIsThanks: (bool: boolean) => void;
}

const useCloseStateStore = create<CloseStateProps>((set) => ({
    isClosed: false,
    setIsClosed: (bool) =>
        set(() => ({
            isClosed: bool,
        })),

    isThanks: false,
    setIsThanks: (bool) =>
        set(() => ({
            isThanks: bool,
        })),
}));

export default useCloseStateStore;
