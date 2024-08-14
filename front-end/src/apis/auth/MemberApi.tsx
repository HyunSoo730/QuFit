import { END_POINT } from '@apis/ApiConstants';
import { instance } from '@apis/axios';
import { MemberInfoDTO } from '@apis/types/request';

export const putMemberInfo = async (data: MemberInfoDTO) => {
    return await instance.put(END_POINT.MEMBER, data);
};
