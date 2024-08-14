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
    useUpdateParticipantStore,  // 추가된 import
} from '@stores/video/roomStore';
import { Room, RoomEvent } from 'livekit-client';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'; // MediaPipe 관련 import 추가

const useRoom = () => {
    const room = useRoomStateStore();
    const setRoom = useSetRoomStateStore();
    const { member } = useMember();

    const addParticipant = useRoomAddParticipantStore();
    const setParticipants = useRoomSetParticipantsStore();
    // const updateParticipant = useUpdateParticipantStore(); // 추가된 부분
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

                // FaceLandmarker 초기화
                const faceLandmarker = await initializeFaceLandmarker();
                addParticipant({
                    ...newParticipant,
                    info: participant,
                    faceLandmarkerReady: !!faceLandmarker,
                    faceLandmarker: faceLandmarker, // 추가된 부분
                });
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
                    
                    // FaceLandmarker 초기화
                    const faceLandmarker = await initializeFaceLandmarker();
                    addParticipant({
                        id: member?.memberId,
                        gender: member?.gender,
                        nickname: member?.nickname,
                        info: room.localParticipant,
                        faceLandmarkerReady: !!faceLandmarker,
                        faceLandmarker: faceLandmarker, // 추가된 부분
                    });
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
                    Array.from(room.remoteParticipants.values()).forEach(async (participant) => {
                        const newParticipant = response.data.members.find(
                            (member: { id: number; gender: 'f' | 'm'; nickname: string }) =>
                                String(member.id) === participant.identity,
                        );

                        // FaceLandmarker 초기화
                        const faceLandmarker = await initializeFaceLandmarker();
                        curParticipants.push({
                            ...newParticipant,
                            info: participant,
                            faceLandmarkerReady: !!faceLandmarker,
                            faceLandmarker: faceLandmarker, // 추가된 부분
                        });
                    });
                    setHostId(response.data.hostId);
                } catch (error) {
                    console.log(error);
                }
                
                // Local Participant 추가
                const faceLandmarker = await initializeFaceLandmarker();
                curParticipants.push({
                    id: member?.memberId,
                    gender: member?.gender,
                    nickname: member?.nickname,
                    info: room.localParticipant,
                    faceLandmarkerReady: !!faceLandmarker,
                    faceLandmarker: faceLandmarker, // 추가된 부분
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

// FaceLandmarker 초기화 함수 추가
async function initializeFaceLandmarker(): Promise<FaceLandmarker | null> {
    try {
        const filesetResolver = await FilesetResolver.forVisionTasks();
        const faceLandmarker = await FaceLandmarker.createFromOptions(
            filesetResolver,
            {
                baseOptions: {
                    modelAssetPath: '여기가 문제.', // 모델 경로 설정
                },
                runningMode: 'VIDEO',
                numFaces: 1,
            }
        );
        return faceLandmarker;
    } catch (error) {
        console.error('Failed to initialize FaceLandmarker:', error);
        return null;
    }
}

export default useRoom;
