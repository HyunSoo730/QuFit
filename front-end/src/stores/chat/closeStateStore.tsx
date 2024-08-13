import { create } from 'zustand';

interface CloseStateProps {
    isClosed: boolean;
    setIsClosed: (bool: boolean) => void;
}

const useCloseStateStore = create<CloseStateProps>((set) => ({
    isClosed: false,
    setIsClosed: (bool) =>
        set(() => ({
            isClosed: bool,
        })),
}));

export default useCloseStateStore;
