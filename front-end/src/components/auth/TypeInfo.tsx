import { MemberInfoDTO } from '@apis/types/request';
import Message from '@components/auth/Message';
import MultipleTag from '@components/auth/MultipleTag';
import MultipleTagGroup from '@components/auth/MultipleTagGroup';
import { HOBBY, MBTI, PERSONALITY } from '@components/auth/SignupConstants';
import Input from '@components/common/input/Input';
import useForm from '@hooks/useForm';

interface InfoProps {
    onNext: (data: MemberInfoDTO) => void;
    registData: MemberInfoDTO;
}

const TypeInfo = ({ onNext, registData }: InfoProps) => {
    const { values, messages, valids, handleChange, handleCheckboxGroupChange, handleSubmit } = useForm({
        initialValues: {
            ...registData,
            typeAgeMax: 0,
            typeAgeMin: 0,
            typeMBTITags: [''],
            typeHobbyTags: [''],
            typePersonalityTags: [''],
        },
        onSubmit: onNext,
    });
    return (
        <>
            <button onClick={handleSubmit}>회원가입 제출</button>
            <div className="flex flex-col">
                <Input
                    name="typeAgeMax"
                    label="최대 나이"
                    value={values.typeAgeMax.toString()}
                    onChange={handleChange}
                />
                {values.typeAgeMax && <Message valid={valids.typeAgeMax}>{messages.typeAgeMax}</Message>}
            </div>
            <div className="flex flex-col">
                <Input
                    name="typeAgeMin"
                    label="최소 나이"
                    value={values.typeAgeMin.toString()}
                    onChange={handleChange}
                />
                {values.typeAgeMin && <Message valid={valids.typeAgeMin}>{messages.typeAgeMin}</Message>}
            </div>
            <div className="flex flex-col">
                <MultipleTagGroup
                    label="이상형 MBTI"
                    onChange={(values) => handleCheckboxGroupChange('typeMBTITags', values)}
                    values={values.typeMBTITags}
                >
                    {MBTI.map((mbti) => (
                        <MultipleTag key={mbti} value={mbti}>
                            {mbti}
                        </MultipleTag>
                    ))}
                </MultipleTagGroup>
                {values.typeMBTITags && <Message valid={valids.typeMBTITags}>{messages.typeMBTITags}</Message>}
            </div>
            <div className="flex flex-col">
                <MultipleTagGroup
                    label="취미"
                    onChange={(values) => handleCheckboxGroupChange('typeHobbyTags', values)}
                    values={values.typeHobbyTags}
                >
                    {HOBBY.map((hobby) => (
                        <MultipleTag key={hobby} value={hobby}>
                            {hobby}
                        </MultipleTag>
                    ))}
                </MultipleTagGroup>
                {values.typeHobbyTags && <Message valid={valids.typeHobbyTags}>{messages.typeHobbyTags}</Message>}
            </div>
            <div className="flex flex-col">
                <MultipleTagGroup
                    label="성격"
                    onChange={(values) => handleCheckboxGroupChange('typePersonalityTags', values)}
                    values={values.typePersonalityTags}
                >
                    {PERSONALITY.map((personality) => (
                        <MultipleTag key={personality} value={personality}>
                            {personality}
                        </MultipleTag>
                    ))}
                </MultipleTagGroup>
                {values.typePersonalityTags && (
                    <Message valid={valids.typePersonalityTags}>{messages.typePersonalityTags}</Message>
                )}
            </div>
            <button
                onClick={handleSubmit}
                disabled={
                    !(
                        valids.typeAgeMax &&
                        valids.typeAgeMin &&
                        valids.typeMBTITags &&
                        valids.typeHobbyTags &&
                        valids.typePersonalityTags
                    )
                }
                className="absolute  disabled:bg-white disabled:effect-none right-0 flex group items-center text-xl border-lightPurple-3 effect-purePink opacity-90 rounded-lg  bg-white justify-center mb-2 mr-3 border-none   hover:border-lightPurple-6  hover:effect-hotPink px-12 py-7 h-7 lg:px-4 lg:h-6 lg:mr-1.5 -translate-y-full"
            >
                제출하기
            </button>
        </>
    );
};

export default TypeInfo;
