import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
type Member = {
    memberId: number;
    email: string;
    nickname: string;
    location: string;
    birthYear: number;
    gender: 'm' | 'f' | undefined;
    bio: string;
    profileImage: string;
    memberMBTITag: string;
    memberHobbyTags: string[];
    memberPersonalityTags: string[];
    typeAgeMax: number;
    typeAgeMin: number;
    typeMBTI: string[];
    typeHobbyTags: string[];
    typePersonalityTags: string[];
};
interface State {
    member: Member | undefined;
}

interface Action {
    setMember: (member: Member | undefined) => void;
}

const useMemberStore = create(
    persist<State & Action>(
        (set) => ({
            member: undefined,
            setMember: (member) => set({ member: member }),
        }),
        { name: 'member', storage: createJSONStorage(() => localStorage) },
    ),
);

export const useMemberInfoStore = () => useMemberStore((state) => state.member);
export const useSetMemberInfoStore = () => useMemberStore((state) => state.setMember);
