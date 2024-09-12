export const AUTH_CODE_PATH = import.meta.env.VITE_AUTH_CODE_PATH;
export const REST_API_KEY = import.meta.env.VITE_CLIIENT_ID;
export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
export const ACCESS_TOKEN_URL = import.meta.env.VITE_ACCESS_TOKEN_PATH;
export const FRONT_URL = import.meta.env.VITE_FRONT_URL;
export const KAKAO_LOGIN_URL = `${AUTH_CODE_PATH}?client_id=${REST_API_KEY}&redirect_uri=${
    FRONT_URL + REDIRECT_URI
}&response_type=code`;

export const WEB_SOCKET_URL = import.meta.env.VITE_WEB_SOCKET_URL;

export const END_POINT = {
    LOGIN: 'qufit/auth/login',
    SIGN_UP: 'qufit/auth/signup',
    CHECK_NICKNAME: 'qufit/check-nickname',

    MEMBER: `qufit/member`,
    PROFILE: 'qufit/member/generate-image',

    VIDEO: 'qufit/video',
    VIDEO_DETAIL: (videoId: number) => `qufit/video/${videoId}`,
    VIDEO_JOIN: (videoId: number) => `qufit/video/${videoId}/join`,
    VIDEO_LEAVE: (videoId: number) => `qufit/video/${videoId}/leave`,
    VIDEO_FILTER: `qufit/video/filter`,
    VIDEO_RECOMMENDATION: `qufit/video/recommendation`,
    FRIEND: 'qufit/friend',
    CHAT: 'qufit/chat/rooms',
    GAME: `qufit/game`,
    ADMIN: `qufit/admin`,
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONTENT_TOO_LARGE: 413,
    INTERNAL_SERVER_ERROR: 500,
};
