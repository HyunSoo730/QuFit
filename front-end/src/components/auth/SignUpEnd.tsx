import { LogoSignup } from '@assets/svg';
import { SignUpProps } from '@pages/SignupPage';
import useForm from '@hooks/useForm';
import signupValidate from '@utils/signupValidate';

const SignUpEnd = ({ onNext, registData }: SignUpProps) => {
    const { handleSubmit } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });
    return(
        <div className="flex flex-col items-center justify-center gap-10">
            <LogoSignup width={'10rem'} />
            <div className="text-sm xl:text-md">가입이 완료됐습니다! 큐핏에서 좋은 인연을 찾아보세요.</div>
            <button
            className="flex items-center h-10 text-lg text-white rounded-full min-w-20 max-w-30 px-9 bg-pink">
                    <p className="w-full" onClick={handleSubmit}>
                        시작하기
                    </p>
                </button>
        
        </div>
    
)
}

export default SignUpEnd;