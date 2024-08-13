import { LogoSignup } from '@assets/svg';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@routers/PathConstants';


const SignUpEnd = () => {
    const navigate = useNavigate();
    return(
        <div className="flex flex-col items-center justify-center gap-10">
            <LogoSignup width={'10rem'} />
            <div className="text-sm xl:text-md">가입이 완료됐습니다! 큐핏에서 좋은 인연을 찾아보세요.</div>
            <button
            onClick={() => navigate(PATH.INTRODUCTION)} 
            className="flex items-center h-10 text-lg text-white rounded-full min-w-20 max-w-30 px-9 bg-pink">
                    <p className="w-full">
                        시작하기
                    </p>
                </button>
        
        </div>
    
)
}

export default SignUpEnd;