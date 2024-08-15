import { END_POINT } from '@apis/ApiConstants';
import { instance } from '@apis/axios';
import { MemberInfoDTO } from '@apis/types/request';

export const putMemberInfo = async (data: MemberInfoDTO) => {
    return await instance.put(END_POINT.MEMBER, data);
};

// 관리자
export const getMemberList = async (page: number, size: number, sort?: string, status?: string) => {
    // params 객체에 page, size, sort, status를 포함시킵니다.
    const params: { page: number; size: number; sort?: string; status?: string } = {
        page,
        size,
        sort,
        status,
    };

    return await instance.get(END_POINT.ADMIN + '/users', { params });
};

export const postProfile = async () => {
    return await instance.post(END_POINT.PROFILE);
};
