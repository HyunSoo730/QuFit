import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TabStateStore {
    buttonFocus: string;
    setButtonFocus: (button: string) => void;
}

const useTabStateStore = create(
    persist<TabStateStore>(
        (set) => ({
            buttonFocus: 'friend',
            setButtonFocus: (button) =>
                set(() => ({
                    buttonFocus: button,
                })),
        }),
        { name: 'tabState', storage: createJSONStorage(() => sessionStorage) },
    ),
);

export default useTabStateStore;
