import { REDIRECT_URI } from '@apis/ApiConstants';

export const PATH = {
    ROOT: '/',
    SIGN_UP: '/signup',
    INTRODUCTION: '/introduction',
    MAIN: '/main',
    CREATE_ROOM: '/main/create',
    CHATTING: '/chatting',
    MY_PAGE: '/mypage',
    ADMIN: '/admin',
    GROUP_VIDEO: (roomId: number | string) => `/video/group/${roomId}`,
    WAIT: (roomId: number | string) => `/video/wait/${roomId}`,
    PERSONAL_VIDEO: (roomId: number | string) => `/video/personal/${roomId}`,

    //카카오 소셜로그인 관련
    KAKAO_REDIRECT: REDIRECT_URI,
};
