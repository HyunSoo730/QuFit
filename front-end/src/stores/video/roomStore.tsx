import { FaceLandmarker } from '@mediapipe/tasks-vision';
import { Room } from 'livekit-client';
import { Participant } from 'livekit-client';
import { create } from 'zustand';

export interface RoomParticipant {
    id: number | undefined;
    gender: 'f' | 'm' | undefined;
    nickname: string | undefined;
    info: Participant | undefined;
    faceLandmarkerReady: boolean;  // 추가
    faceLandmarker: FaceLandmarker | null;  // 방 참가자별로 FaceLandmarker 인스턴스 가지고 있도록 해야했음.
}

interface State {
    room: Room | undefined;
    participants: RoomParticipant[];
    hostId: number | undefined;
    roomId: number | undefined;
    otherGenderParticipants: RoomParticipant[];
    otherIdx: number;
}

interface Action {
    setRoom: (room: Room | undefined) => void;
    addParticipant: (participant: RoomParticipant) => void;
    setParticipants: (participant: RoomParticipant[]) => void;
    setHostId: (id: number) => void;
    setRoomId: (id: number) => void;
    setOtherGenderParticipants: (participants: RoomParticipant[]) => void;
    setOtherIdx: (idx: number) => void;
    updateParticipant: (id: number, update: Partial<RoomParticipant>) => void;  // 업데이트 메서드 추가
}

const useRoomStore = create<State & Action>((set) => ({
    room: undefined,
    participants: [],
    myName: '',
    hostId: undefined,
    roomId: undefined,
    otherGenderParticipants: [],
    otherIdx: 0,

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

    updateParticipant: (id, update) =>
        set((state) => ({
            participants: state.participants.map((p) =>
                p.id === id ? { ...p, ...update } : p
            ),
        })),

}));

export const useRoomStateStore = () => useRoomStore((state) => state.room);
export const useRoomParticipantsStore = () => useRoomStore((state) => state.participants);
export const useHostIdStore = () => useRoomStore((state) => state.hostId);
export const useRoomIdStore = () => useRoomStore((state) => state.roomId);
export const useOtherGenderParticipantsStore = () => useRoomStore((state) => state.otherGenderParticipants);
export const useOtherIdxStore = () => useRoomStore((state) => state.otherIdx);

export const useSetRoomStateStore = () => useRoomStore((state) => state.setRoom);
export const useRoomAddParticipantStore = () => useRoomStore((state) => state.addParticipant);
export const useRoomSetParticipantsStore = () => useRoomStore((state) => state.setParticipants);
export const useSetHostIdStore = () => useRoomStore((state) => state.setHostId);
export const useSetRoomIdStore = () => useRoomStore((state) => state.setRoomId);
export const useSetOtherGenderParticipantsStore = () => useRoomStore((state) => state.setOtherGenderParticipants);
export const useSetOtherIdxStore = () => useRoomStore((state) => state.setOtherIdx);
export const useUpdateParticipantStore = () => useRoomStore((state) => state.updateParticipant);  // 새로운 업데이트 메서드