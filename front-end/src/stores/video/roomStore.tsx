import { Room } from 'livekit-client';
import { Participant } from 'livekit-client';
import { create } from 'zustand';

export interface RoomParticipant {
    id: number | undefined;
    gender: 'f' | 'm' | undefined;
    nickname: string | undefined;
    info: Participant | undefined;
}

interface State {
    room: Room | undefined;
    participants: RoomParticipant[];
    hostId: number | undefined;
    roomId: number | undefined;
    otherGenderParticipants: RoomParticipant[];
    otherIdx: number;
    roomMax: number | undefined;

    maleParticipants: RoomParticipant[];
    femaleParticipants: RoomParticipant[];
    privateParticipants: RoomParticipant[];
}

interface Action {
    setRoom: (room: Room | undefined) => void;
    addParticipant: (participant: RoomParticipant) => void;
    setParticipants: (participant: RoomParticipant[] | undefined) => void;
    setHostId: (id: number) => void;
    setRoomId: (id: number) => void;
    setOtherGenderParticipants: (participants: RoomParticipant[]) => void;
    setOtherIdx: (idx: number) => void;
    setRoomMax: (roomMax: number) => void;

    setMaleParticipants: (participants: RoomParticipant[] | undefined) => void;
    setFemaleParticipants: (participants: RoomParticipant[] | undefined) => void;
    setPrivateParticipants: (participants: RoomParticipant[] | undefined) => void;
}

const useRoomStore = create<State & Action>((set) => ({
    roomMax: undefined,
    room: undefined,
    participants: [],
    myName: '',
    hostId: undefined,
    roomId: undefined,
    otherGenderParticipants: [],
    otherIdx: 0,

    maleParticipants: [],
    femaleParticipants: [],
    privateParticipants: [],

    setRoomMax: (roomMax) => set({ roomMax: roomMax }),
    setRoom: (room) => set({ room: room }),
    addParticipant: (participant) =>
        set((state) => ({
            participants: [...state.participants, participant],
        })),

    setParticipants: (participants) => set({ participants: participants }),

    setHostId: (hostId) => set({ hostId: hostId }),

    setRoomId: (roomId) => set({ roomId: roomId }),
    setOtherGenderParticipants: (participants) => set({ otherGenderParticipants: participants }),
    setOtherIdx: (idx) => set({ otherIdx: idx }),
    setMaleParticipants: (participants) => set({ maleParticipants: participants }),
    setFemaleParticipants: (participants) => set({ femaleParticipants: participants }),
    setPrivateParticipants: (participants) => set({ privateParticipants: participants }),
}));

export const useRoomStateStore = () => useRoomStore((state) => state.room);
export const useRoomParticipantsStore = () => useRoomStore((state) => state.participants);
export const useHostIdStore = () => useRoomStore((state) => state.hostId);
export const useRoomIdStore = () => useRoomStore((state) => state.roomId);
export const useOtherGenderParticipantsStore = () => useRoomStore((state) => state.otherGenderParticipants);
export const useOtherIdxStore = () => useRoomStore((state) => state.otherIdx);
export const useMaleParticipantsStore = () => useRoomStore((state) => state.maleParticipants);
export const useFemaleParticipantsStore = () => useRoomStore((state) => state.femaleParticipants);
export const usePrivateParticipantsStore = () => useRoomStore((state) => state.privateParticipants);
export const useRoomMaxStore = () => useRoomStore((state) => state.roomMax);

export const useSetRoomStateStore = () => useRoomStore((state) => state.setRoom);
export const useRoomAddParticipantStore = () => useRoomStore((state) => state.addParticipant);
export const useRoomSetParticipantsStore = () => useRoomStore((state) => state.setParticipants);
export const useSetHostIdStore = () => useRoomStore((state) => state.setHostId);
export const useSetRoomIdStore = () => useRoomStore((state) => state.setRoomId);
export const useSetOtherGenderParticipantsStore = () => useRoomStore((state) => state.setOtherGenderParticipants);
export const useSetOtherIdxStore = () => useRoomStore((state) => state.setOtherIdx);
export const useSetMaleParticipantsStore = () => useRoomStore((state) => state.setMaleParticipants);
export const useSetFemaleParticipantsStore = () => useRoomStore((state) => state.setFemaleParticipants);
export const useSetPrivateParticipantsStore = () => useRoomStore((state) => state.setPrivateParticipants);
export const useSetRoomMaxStore = () => useRoomStore((state) => state.setRoomMax);
