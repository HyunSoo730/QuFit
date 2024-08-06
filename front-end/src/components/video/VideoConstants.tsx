export const GROUP_VIDEO_END_SEC = 900;
export const PERSONAL_VIDEO_END_SEC = 300;
export const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;
export const ROOM_SETTING = {
    videoCaptureDefaults: {
        deviceId: '',
        facingMode: 'user' as 'user' | 'environment' | 'left' | 'right',
        resolution: {
            width: 355,
            height: 260,
            frameRate: 30,
        },
    },
};
