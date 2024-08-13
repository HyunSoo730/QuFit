import TextInput from '@components/auth/TextInput';
import useForm from '@hooks/useForm';
import { SignUpProps } from '@pages/SignupPage';
import signupValidate from '@utils/signupValidate';

const Nickname = ({ onNext, registData }: SignUpProps) => {
    const { values, handleChange, handleSubmit } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });
    return (
        <>
            <div className="flex flex-col gap-5">
                <p>큐핏에서 사용할 닉네임을 입력해주세요</p>
                <TextInput label={'닉네임'} name={'nickname'} value={values.nickname} onChange={handleChange} />
            </div>
            <div className="flex justify-end w-full">
                <button className="flex items-center text-white rounded-full min-w-20 max-w-28 h-9 px-9 bg-pink">
                    <p className="w-full" onClick={handleSubmit}>
                        다음
                    </p>
                </button>
            </div>
        </>
    );
};

export default Nickname;
