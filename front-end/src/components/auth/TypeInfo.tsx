import { MemberInfoDTO } from '@apis/types/request';
import Message from '@components/auth/Message';
import MultipleTag from '@components/auth/MultipleTag';
import MultipleTagGroup from '@components/auth/MultipleTagGroup';
import { HOBBY, MBTI, PERSONALITY } from '@components/auth/SignupConstants';
import Select from '@components/common/select/Select';
import useForm from '@hooks/useForm';
import signupValidate from '@utils/signupValidate';
import generateSelectOptions from '@utils/generateSelectOptions';

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
        },
        onSubmit: onNext,
        validate: signupValidate,
    });
    return (
        <>
        <p className="py-5 text-4xl font-bold text-white mx-7">내 이상형 정보</p>
        <div className="flex gap-10 mx-5">
        <div className="flex flex-col w-1/2 px-10 gap-7">
        <div className="flex flex-row justify-between gap-10">
            <div className="flex flex-col w-1/2">
                <Select
                    name="typeAgeMax"
                    label="최대 나이 차이"
                    value={values.typeAgeMax.toString()}
                    onChange={handleChange}
                    options={generateSelectOptions(0, 20)}

                />
                {values.typeAgeMax && <Message valid={valids.typeAgeMax}>{messages.typeAgeMax || "없어"}</Message>}
            </div>
            <div className="flex flex-col w-1/2">
                <Select
                    name="typeAgeMin"
                    label="최소 나이 차이"
                    value={values.typeAgeMin.toString()}
                    onChange={handleChange}
                    options={generateSelectOptions(0, 20)}
                />
                {values.typeAgeMin && <Message valid={valids.typeAgeMin}>{messages.typeAgeMin}</Message>}
            </div>
        </div>
</div>
       
<div className="flex flex-col w-1/2 gap-4">

            <div className="flex flex-col">
                <MultipleTagGroup
                    label="이상형의 MBTI"
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
                    label="이상형의 취미"
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
                    label="이상형의 성격"
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
            </div>
            </div>
            <div
            className="sticky flex flex-row justify-end gap-2 pr-5 bottom-5">
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
                className="flex items-center justify-center h-4 px-5 py-5 border-2 border-transparent hover:border-pink text-pink rounded-xl disabled:hidden group text-l lg:px-3 lg:h-5 lg:mr-1"
            >
                제출하기
            </button>
                <button
                className="flex items-center justify-center h-5 px-5 py-5 text-white bg-white bg-opacity-50 border-none lex rounded-xl effect-none group text-l opacity-90 hover:bg-opacity-30 lg:px-3 lg:h-5 lg:mr-1">
                취소
                </button>
            </div>      

            

        </>
    );
};

export default TypeInfo;
