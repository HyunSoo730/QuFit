import { useMemberQuery } from '@queries/useMemberQuery';
import { useMemberInfoStore, useSetMemberInfoStore } from '@stores/member/memberStore';
import { useEffect } from 'react';

export interface MemberProps {}
const useMember = () => {
    const member = useMemberInfoStore();
    const setMember = useSetMemberInfoStore();
    const { data, isSuccess } = useMemberQuery();

    useEffect(() => {
        if (isSuccess) {
            setMember(data.data);
        }
    }, [isSuccess]);
    return { member };
};

export default useMember;
