import { HTTP_STATUS, KAKAO_LOGIN_URL } from '@apis/ApiConstants';
import axios from 'axios';
export const qufitAcessTokenA = import.meta.env.VITE_QUFIT_ACCESS_TOKEN_A;
export const qufitAcessTokenB = import.meta.env.VITE_QUFIT_ACCESS_TOKEN_B;
export const qufitAcessTokenC = import.meta.env.VITE_QUFIT_ACCESS_TOKEN_C;
export const qufitAcessTokenD = import.meta.env.VITE_QUFIT_ACCESS_TOKEN_D;

//로그인을 하고 해야하는 API
let accessToken = '';
if (location.port === '3000') {
    accessToken = qufitAcessTokenA;
} else if (location.port === '3001') {
    accessToken = qufitAcessTokenB;
} else if (location.port === '3002') {
    accessToken = qufitAcessTokenC;
} else if (location.port === '3003') {
    accessToken = qufitAcessTokenD;
} else {
    accessToken = qufitAcessTokenA;
}

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: 'Bearer ' + accessToken,
    },
});

// 카카오 엑세스 토큰으로 보내야 하는 API
export const kakaoInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: accessToken,
    },
});

//로그인 요청없이 해야하는 API
export const defaultInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (
            error.response.status === HTTP_STATUS.UNAUTHORIZED &&
            error.response.data.message === '토큰이 만료되었습니다.'
        ) {
            location.href = KAKAO_LOGIN_URL;
            //TODO:로그인 로직 성공하면 토큰 다시 넣어야함.
        }
    },
);
