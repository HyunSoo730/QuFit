import { create } from 'zustand';

interface isPendingProps {
    isPending: boolean;
    setIsPending: (bool: boolean) => void;
}

const useIsPendingStore = create<isPendingProps>((set) => ({
    isPending: false,
    setIsPending: (bool) =>
        set(() => ({
            isPending: bool,
        })),
}));

export default useIsPendingStore;
