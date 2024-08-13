import { END_POINT } from '@apis/ApiConstants';
import { instance } from '@apis/axios';

export const getGameResult = async () => {
    return await instance.get(END_POINT.GAME);
};

export const postGameResult = async () => {
    return await instance.post(END_POINT.GAME);
};
