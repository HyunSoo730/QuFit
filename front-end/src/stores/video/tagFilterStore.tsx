import { create } from 'zustand';

interface TagFilterProps {
    tagsId: number[];
    setTagsId: (list: number[]) => void;
    tags: string[];
    setTags: (list: string[]) => void;
}

const useTagFilterStore = create<TagFilterProps>((set) => ({
    tagsId: [],
    setTagsId: (list: number[]) => set(() => ({ tagsId: list })),

    tags: [],
    setTags: (list: string[]) => set(() => ({ tags: list })),
}));

export default useTagFilterStore;
