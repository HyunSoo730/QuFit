// export const GROUP_VIDEO_END_SEC = 15 * 60;
// export const PERSONAL_VIDEO_END_SEC = 5 * 60;

export const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;
export const ROOM_SETTING = {
    videoCaptureDefaults: {
        deviceId: '',
        facingMode: 'user' as 'user' | 'environment' | 'left' | 'right',
        resolution: {
            width: 1280,  // HD 해상도로 설정
            height: 720,
            frameRate: 30,
        },
    },
};
