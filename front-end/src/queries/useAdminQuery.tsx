// import { END_POINT } from '@apis/ApiConstants';
// import { instance } from '@apis/axios';
import { useQuery } from '@tanstack/react-query';
import { AdminMemberListResponse } from '@apis/types/response';
import { getMemberList } from '@apis/auth/MemberApi';


export const getMemberListQuery = (page: number, size: number, sort: string = '', status: string = '') => {
    return useQuery<AdminMemberListResponse, Error>({
        queryKey: ['admin', page, size, sort, status],
        queryFn: () => 
            getMemberList(page, size, sort, status)
            .then((response) => response.data)
            .catch((error) => console.log(error))
        });
};
