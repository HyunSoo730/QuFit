import { LIVEKIT_URL, ROOM_SETTING } from '@components/video/VideoConstants';
import {
    useCreateVideoRoomMutation,
    useJoinVideoRoomMutation,
    useLeaveVideoRoomMutation,
} from '@queries/useVideoQuery';
import {
    useRoomAddParticipantStore,
    useRoomManagerNameStore,
    useRoomMyNameStore,
    useRoomSetManagerNameStore,
    useRoomStateStore,
    useSetRoomStateStore,
} from '@stores/video/roomStore';
import { Room, RoomEvent } from 'livekit-client';
import { useEffect, useState } from 'react';

const useRoom = () => {
    const [_, setVideoRoomId] = useState<number | null>(null);
    const room = useRoomStateStore();
    const setRoom = useSetRoomStateStore();
    const managerName = useRoomManagerNameStore();
    const myName = useRoomMyNameStore();

    const [isManager, setIsManager] = useState(false);

    useEffect(() => {
        setIsManager(!!myName && !!managerName && managerName === myName);
    }, [managerName, myName]);

    const setManagerName = useRoomSetManagerNameStore();
    const addParticipant = useRoomAddParticipantStore();

    const createVideoRoom = useCreateVideoRoomMutation();
    const joinVideoRoom = useJoinVideoRoomMutation();
    const leaveVideoRoom = useLeaveVideoRoomMutation();

    const addRoomEventHandler = async (room: Room) => {
        room.on(RoomEvent.ParticipantConnected, (participant) => {
            addParticipant({ memberId: 1, gender: 'f', nickname: '현명', info: participant });
        });
    };

    const decideManager = async (room: Room) => {
        await room.localParticipant.enableCameraAndMicrophone();
        // await room.localParticipant.setCameraEnabled(true);
        const curParticipants = [];
        curParticipants.push(room.localParticipant);
        Array.from(room.remoteParticipants.values()).forEach((participant) => curParticipants.push(participant));
        curParticipants.sort((partA, partB) => {
            if (new Date(partA.joinedAt!).getTime() > new Date(partB.joinedAt!).getTime()) return 1;
            else return -1;
        });

        setManagerName(curParticipants[0].name!);
        addParticipant({ memberId: 1, gender: 'f', nickname: '현명', info: room.localParticipant });
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
                    setVideoRoomId(data.data.videoRoomId);
                    const room = new Room(ROOM_SETTING);
                    await room.connect(LIVEKIT_URL, data?.data.token);
                    setRoom(room);
                    addRoomEventHandler(room);
                    decideManager(room);
                },
                onError: async (data) => {
                    console.log(data);
                },
            },
        );
    };

    async function joinRoom(videoRoomId: number) {
        const room = new Room(ROOM_SETTING);
        setRoom(room);

        joinVideoRoom.mutate(videoRoomId, {
            onSuccess: async (data) => {
                await room.connect(LIVEKIT_URL, data?.data.token);
                addRoomEventHandler(room);
                decideManager(room);
                setVideoRoomId(videoRoomId!);
            },
        });
    }

    async function leaveRoom(videoRoomId: number) {
        leaveVideoRoom.mutate(videoRoomId, {
            onSuccess: async () => {
                await room?.disconnect();
                setRoom(undefined);
            },
        });
    }
    return { isManager, createRoom, joinRoom, leaveRoom };
};

export default useRoom;
