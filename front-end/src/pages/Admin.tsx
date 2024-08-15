import AdminLogin from "@components/admin/AdminLogin"
import AdminMemberCheck from "@components/admin/AdminMemberCheck"
import { useAccessTokenStore } from '@stores/auth/tokenStore';
import { useState } from 'react';

const Admin = () => {
    // 진입 시 토큰 확인 토큰 o -> 회원 승인 페이지 -> 권한없으면 소개페이지
    // 토큰 x -> 로그인 페이지 -> 어드민 페이지
    
    const [isAdmin, setIsAdmin] = useState(false);
    
    const accessToken = useAccessTokenStore();
    if(accessToken) setIsAdmin(true);

    return(
        <main>
            {!isAdmin && (
            <AdminLogin/>
            )}
            {isAdmin && (
            <AdminMemberCheck/>
            )}
       </main>
    )
}

export default Admin;