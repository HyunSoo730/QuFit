import { KAKAO_LOGIN_URL } from '@apis/ApiConstants';
import { Link } from 'react-router-dom';

const LoginBtn = () => {
    return <Link to={KAKAO_LOGIN_URL}>나를 누르면 카카오 소셜로그인을 할 수 있어</Link>;
};

export default LoginBtn;
