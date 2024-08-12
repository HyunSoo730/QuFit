import { MemberInfoDTO } from '@apis/types/request';
import TextInput from '@components/auth/TextInput';
import useForm from '@hooks/useForm';
import { SignUpProps } from '@pages/SignupPage';
import signupValidate from '@utils/signupValidate';
import { ChangeEvent } from 'react';

const Nickname = ({ onNext, registData }: SignUpProps) => {
    const { values, handleChange, handleSubmit, handleSelectChange } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });
    return (
        <>
            <div className="flex items-center gap-3">
                <p>큐핏에서 사용할 닉네임을 입력해주세요</p>
                <TextInput name={'nickname'} value={values.nickname} onChange={handleChange} />
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
