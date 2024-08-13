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
    useRoomSetParticipantsStore,
    useRoomStateStore,
    useSetHostIdStore,
    useSetRoomStateStore,
} from '@stores/video/roomStore';
import { Room, RoomEvent } from 'livekit-client';

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

                    // console.log(location.pathname);
                    // if (location.pathname.includes('/video/group/')) {
                    //     navigate(PATH.PERSONAL_VIDEO(data.data.videoRoomId));
                    // }
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
    }

    async function leaveRoom(videoRoomId: number) {
        leaveVideoRoom.mutate(videoRoomId, {
            onSuccess: async () => {
                await room?.disconnect();
                setRoom(undefined);
            },
        });
    }
    return { hostId, isHost, createRoom, joinRoom, leaveRoom };
};

export default useRoom;
