import { HOBBY, MBTI, PERSONALITY } from '@components/mypage/SignupConstants';
import useForm from '@hooks/useForm';
import { SignUpProps } from '@pages/SignupPage';
import signupValidate from '@utils/signupValidate';
import Select from 'react-select';

const TypeInfo = ({ onNext, registData }: SignUpProps) => {
    const { values, handleChange, handleSubmit, handleSelectChange, handleMultiValueChange } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });

    const hoobies = HOBBY.map((hobby) => ({ value: hobby['tag_name'], label: hobby['tag_name'] }));
    const personalities = PERSONALITY.map((personality) => ({
        value: personality['tag_name'],
        label: personality['tag_name'],
    }));
    const age = Array.from({ length: 100 }, (_, idx) => ({ label: idx, value: idx }));

    const mbti = MBTI.map((mbti) => ({ value: mbti['tag_name'], label: mbti['tag_name'] }));
    return (
        <>
            <div className="flex justify-end w-full">
                <div className="flex flex-col">
                    <Select
                        options={age}
                        onChange={(e) => handleSelectChange(e, 'typeAgeMax')}
                        className="w-full"
                        placeholder="몇살 위까지 원하나요?"
                    />
                    <Select
                        options={age}
                        onChange={(e) => handleSelectChange(e, 'typeAgeMin')}
                        className="w-full"
                        placeholder="몇살 아래까지 원하나요?"
                    />

                    <Select
                        isMulti={true}
                        options={mbti}
                        placeholder="이상형의 MBTI를 알려주세요"
                        onChange={(e) => handleMultiValueChange(e, 'typeMBTITags')}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                    <Select
                        isMulti={true}
                        options={hoobies}
                        onChange={(e) => handleMultiValueChange(e, 'typeHobbyTags')}
                        placeholder="이상형의 취미를 골라주세요"
                        classNamePrefix="select"
                    />
                    <Select
                        isMulti={true}
                        options={personalities}
                        placeholder="이상형의 성격을 골라주세요"
                        onChange={(e) => handleMultiValueChange(e, 'typePersonalityTags')}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
                <button className="flex items-center text-white rounded-full min-w-20 max-w-28 h-9 px-9 bg-pink">
                    <p className="w-full" onClick={handleSubmit}>
                        다음
                    </p>
                </button>
            </div>
        </>
    );
};

export default TypeInfo;
