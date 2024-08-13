import { getVideoDetail } from '@apis/video/VideoApi';
import { LIVEKIT_URL, ROOM_SETTING } from '@components/video/VideoConstants';
import useMember from '@hooks/useMember';
import {
    useCreateVideoRoomMutation,
    useJoinVideoRoomMutation,
    useLeaveVideoRoomMutation,
} from '@queries/useVideoQuery';
import {
    RoomParticipant,
    useHostIdStore,
    useRoomAddParticipantStore,
    useRoomParticipantsStore,
    useRoomSetParticipantsStore,
    useRoomStateStore,
    useSetFemaleParticipantsStore,
    useSetHostIdStore,
    useSetMaleParticipantsStore,
    useSetRoomStateStore,
} from '@stores/video/roomStore';
import { Room, RoomEvent } from 'livekit-client';
import { useEffect } from 'react';

const useRoom = () => {
    const room = useRoomStateStore();
    const setRoom = useSetRoomStateStore();
    const { member } = useMember();

    const addParticipant = useRoomAddParticipantStore();
    const setParticipants = useRoomSetParticipantsStore();
    const setHostId = useSetHostIdStore();
    const hostId = useHostIdStore();
    const createVideoRoom = useCreateVideoRoomMutation();
    const joinVideoRoom = useJoinVideoRoomMutation();
    const leaveVideoRoom = useLeaveVideoRoomMutation();
    const isHost = member?.memberId === hostId;

    const setMaleParticipants = useSetMaleParticipantsStore();
    const setFemaleParticipants = useSetFemaleParticipantsStore();
    const setPrivateParticipants = useSetFemaleParticipantsStore();
    const setOtherGenderParticipants = useSetFemaleParticipantsStore();
    const participants = useRoomParticipantsStore();

    useEffect(() => {
        const maleParticipants = participants
            .filter((participant) => participant.gender === 'm')
            .sort((a, b) => a.id! - b.id!);
        const femaleParticipants = participants
            .filter((participant) => participant.gender === 'f')
            .sort((a, b) => a.id! - b.id!);
        if (member?.gender === 'm') {
            const currentUserIndex = maleParticipants.findIndex((participant) => participant.id === member?.memberId);
            const reorderedOtherParticipants = femaleParticipants
                .slice(currentUserIndex)
                .concat(femaleParticipants.slice(0, currentUserIndex));
            setOtherGenderParticipants(reorderedOtherParticipants);
        } else if (member?.gender === 'f') {
            const currentUserIndex = femaleParticipants.findIndex((participant) => participant.id === member?.memberId);
            const reorderedOtherParticipants = maleParticipants
                .slice(currentUserIndex)
                .concat(maleParticipants.slice(0, currentUserIndex));
            console.log(reorderedOtherParticipants);

            setOtherGenderParticipants(reorderedOtherParticipants);
        }
    }, [participants]);

    const addRoomEventHandler = async (room: Room, roomId: number) => {
        room.on(RoomEvent.ParticipantConnected, async (participant) => {
            try {
                const response = await getVideoDetail(roomId);
                const newParticipant = response.data.members.find(
                    (member: { id: number; gender: 'f' | 'm'; nickname: string }) =>
                        member.id === Number(participant.identity),
                );
                addParticipant({ ...newParticipant, info: participant });
            } catch (error) {}
        });
    };

    const decideManager = async (room: Room) => {
        await room.localParticipant.enableCameraAndMicrophone();
    };
    const createRoom = () => {
        createVideoRoom.mutate(
            {
                videoRoomName: 'test11',
                maxParticipants: 4,
                videoRoomHobbies: [],
                videoRoomPersonalities: [],
            },
            {
                onSuccess: async (data) => {
                    const room = new Room(ROOM_SETTING);
                    await room.connect(LIVEKIT_URL, data?.data.token);
                    setRoom(room);
                    addRoomEventHandler(room, data.data.videoRoomId);

                    decideManager(room);
                    setHostId(member?.memberId!);
                    addParticipant({
                        id: member?.memberId,
                        gender: member?.gender,
                        nickname: member?.nickname,
                        info: room.localParticipant,
                    });
                },
                onError: async (data) => {
                    console.log(data);
                },
            },
        );
    };

    const joinRoom = async (videoRoomId: number) => {
        const room = new Room(ROOM_SETTING);
        setRoom(room);
        joinVideoRoom.mutate(videoRoomId, {
            onSuccess: async (response) => {
                await room.connect(LIVEKIT_URL, response?.data.token);
                const curParticipants: RoomParticipant[] = [];
                try {
                    const response = await getVideoDetail(videoRoomId);
                    Array.from(room.remoteParticipants.values()).forEach((participant) => {
                        const newParticipant = response.data.members.find(
                            (member: { id: number; gender: 'f' | 'm'; nickname: string }) =>
                                String(member.id) === participant.identity,
                        );
                        curParticipants.push({ ...newParticipant, info: participant });
                    });
                    setHostId(response.data.hostId);
                } catch (error) {
                    console.log(error);
                }
                curParticipants.push({
                    id: member?.memberId,
                    gender: member?.gender,
                    nickname: member?.nickname,
                    info: room.localParticipant,
                });
                setParticipants(curParticipants);
                addRoomEventHandler(room, videoRoomId);
                decideManager(room);
            },
        });
    };

    const leaveRoom = (videoRoomId: number) => {
        leaveVideoRoom.mutate(videoRoomId, {
            onSuccess: async () => {
                await room?.disconnect();
                setRoom(undefined);
            },
        });
    };
    return { hostId, isHost, createRoom, joinRoom, leaveRoom };
};

export default useRoom;
