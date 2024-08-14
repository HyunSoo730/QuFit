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
    useUpdateParticipantStore,
} from '@stores/video/roomStore';
import { Room, RoomEvent } from 'livekit-client';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

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

                const faceLandmarker = await initializeFaceLandmarker();
                addParticipant({
                    ...newParticipant,
                    info: participant,
                    faceLandmarkerReady: !!faceLandmarker,
                    faceLandmarker: faceLandmarker,
                });
            } catch (error) {
                console.error('Error in addRoomEventHandler:', error);
            }
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
                    
                    const faceLandmarker = await initializeFaceLandmarker();
                    addParticipant({
                        id: member?.memberId,
                        gender: member?.gender,
                        nickname: member?.nickname,
                        info: room.localParticipant,
                        faceLandmarkerReady: !!faceLandmarker,
                        faceLandmarker: faceLandmarker,
                    });
                },
                onError: async (data) => {
                    console.log('Error creating room:', data);
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

                        const faceLandmarker = await initializeFaceLandmarker();
                        curParticipants.push({
                            ...newParticipant,
                            info: participant,
                            faceLandmarkerReady: !!faceLandmarker,
                            faceLandmarker: faceLandmarker,
                        });
                    });
                    setHostId(response.data.hostId);
                } catch (error) {
                    console.log('Error fetching video details:', error);
                }
                
                const faceLandmarker = await initializeFaceLandmarker();
                curParticipants.push({
                    id: member?.memberId,
                    gender: member?.gender,
                    nickname: member?.nickname,
                    info: room.localParticipant,
                    faceLandmarkerReady: !!faceLandmarker,
                    faceLandmarker: faceLandmarker,
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

async function initializeFaceLandmarker(): Promise<FaceLandmarker | null> {
    try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm' // 여기 URL을 수정
        );
        
        const faceLandmarker = await FaceLandmarker.createFromOptions(
            filesetResolver,
            {
                baseOptions: {
                    modelAssetPath:
                        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                    delegate: 'GPU',
                },
                runningMode: 'VIDEO',
                numFaces: 1,
                outputFaceBlendshapes: true,
                outputFacialTransformationMatrixes: true,
            }
        );
        return faceLandmarker;
    } catch (error) {
        console.error('Failed to initialize FaceLandmarker:', error);
        return null;
    }
}

export default useRoom;