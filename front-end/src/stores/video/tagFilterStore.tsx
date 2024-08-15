import { create } from 'zustand';

interface TagFilterProps {
    hobbyTagsId: number[];
    setHobbyTagsId: (list: number[]) => void;
    idealTypeTagsId: number[];
    setIdealTypeTagsId: (list: number[]) => void;
    tags: string[];
    setTags: (list: string[]) => void;
}

const useTagFilterStore = create<TagFilterProps>((set) => ({
    hobbyTagsId: [],
    setHobbyTagsId: (list: number[]) => set(() => ({ hobbyTagsId: list })),

    idealTypeTagsId: [],
    setIdealTypeTagsId: (list: number[]) => set(() => ({ idealTypeTagsId: list })),

    tags: [],
    setTags: (list: string[]) => set(() => ({ tags: list })),
}));

export default useTagFilterStore;
