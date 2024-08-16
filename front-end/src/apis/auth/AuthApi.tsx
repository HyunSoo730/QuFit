import { ACCESS_TOKEN_URL, END_POINT, FRONT_URL, REDIRECT_URI, REST_API_KEY } from '@apis/ApiConstants';
import { kakaoInstance } from '@apis/axios';
import { MemberInfoDTO } from '@apis/types/request';
import axios from 'axios';

export const getKakaoAccessToken = async (authCode: string) => {
    const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } };
    const params = {
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirectUri: FRONT_URL + REDIRECT_URI,
        code: authCode,
        client_secret: 'XrshnZS6JgnenDmWMXo4YGUJ9PUZwnOH',
    };

    const response = await axios.post(ACCESS_TOKEN_URL, params, header);
    //TODO: 예외처리해야함

    return response;
};

export const login = async (kakaoAccessToken: string) => {
    console.log("로그인 시도")
   
    return await kakaoInstance.get(END_POINT.LOGIN, { headers: { accessToken: kakaoAccessToken } });
};

export const signup = async (data: MemberInfoDTO, token: string) => {
    return await kakaoInstance.post(END_POINT.SIGN_UP, data, { headers: { accessToken: token } });
};
