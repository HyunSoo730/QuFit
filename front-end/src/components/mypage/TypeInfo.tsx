import { MemberInfoDTO } from '@apis/types/request';

import Message from '@components/mypage/Message';
import MultipleTag from '@components/mypage/MultipleTag';
import MultipleTagGroup from '@components/mypage/MultipleTagGroup';
import { HOBBY, MBTI, PERSONALITY } from '@components/mypage/SignupConstants';
import useForm from '@hooks/useForm';
import signupValidate from '@utils/signupValidate';
import generateSelectOptions from '@utils/generateSelectOptions';
import Select from '@components/common/select/Select';

interface InfoProps {
    onNext: (data: MemberInfoDTO) => void;
    registData: MemberInfoDTO;
    isUpdate: boolean;
}

const TypeInfo = ({ onNext, registData, isUpdate }: InfoProps) => {
    const { values, messages, valids, handleChange, handleCheckboxGroupChange, handleSubmit } = useForm({
        initialValues: {
            ...registData,
        },
        onSubmit: onNext,
        validate: signupValidate,
    });
    return (
        <>
            <p className="py-5 text-4xl font-bold text-white mx-7">내 이상형 정보</p>
            <div className="flex gap-10 mx-5 my-10">
                <div className="flex flex-col w-1/2 px-10 gap-7">
                    <div className="flex flex-row justify-between gap-10">
                        <div className="flex flex-col w-1/2">
                            <Select
                                name="typeAgeMax"
                                label="최대 나이 차이"
                                value={values.typeAgeMax ? values.typeAgeMax.toString() : "0"}
                                onChange={handleChange}
                                options={generateSelectOptions(0, 20)}
                                isUpdate={isUpdate}
                            />
                            {values.typeAgeMax && (
                                <Message valid={valids.typeAgeMax}>{messages.typeAgeMax}</Message>
                            )}
                        </div>
                        <div className="flex flex-col w-1/2">
                            <Select
                                name="typeAgeMin"
                                label="최소 나이 차이"
                                value={values.typeAgeMin ? values.typeAgeMin.toString() : "0"}
                                onChange={handleChange}
                                options={generateSelectOptions(0, 20)}
                                isUpdate={isUpdate}
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
                                <MultipleTag key={mbti.tag_name} value={mbti.tag_name} isUpdate={isUpdate}>
                                    {mbti.tag_name}
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
                                <MultipleTag key={hobby.tag_name} value={hobby.tag_name} isUpdate={isUpdate}>
                                    {hobby.tag_name}
                                </MultipleTag>
                            ))}
                        </MultipleTagGroup>
                        {values.typeHobbyTags && (
                            <Message valid={valids.typeHobbyTags}>{messages.typeHobbyTags}</Message>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <MultipleTagGroup
                            label="이상형의 성격"
                            onChange={(values) => handleCheckboxGroupChange('typePersonalityTags', values)}
                            values={values.typePersonalityTags}
                        >
                            {PERSONALITY.map((personality) => (
                                <MultipleTag key={personality.tag_name} value={personality.tag_name} isUpdate={isUpdate}>
                                    {personality.tag_name}
                                </MultipleTag>
                            ))}
                        </MultipleTagGroup>
                        {values.typePersonalityTags && (
                            <Message valid={valids.typePersonalityTags}>{messages.typePersonalityTags}</Message>
                        )}
                    </div>
                </div>
            </div>
            <div className="sticky flex flex-row justify-end gap-2 pr-5 bottom-5">
            {!isUpdate && <div>
                <button
                onClick={handleSubmit}
                className="flex items-center justify-center h-4 px-5 py-5 border-2 border-transparent hover:border-pink text-pink rounded-xl disabled:hidden group text-l lg:px-3 lg:h-5 lg:mr-1"
                >
                이전페이지
                </button>
                </div>}
            {isUpdate && 
                <div className="flex flex-row gap-2">
                <button
                    onClick={handleSubmit}
                    disabled={isUpdate ? 
                        !(
                            valids.typeAgeMax &&
                            valids.typeAgeMin &&
                            valids.typeMBTITags &&
                            valids.typeHobbyTags &&
                            valids.typePersonalityTags
                        ) :false
                    }
                    className="flex items-center justify-center h-4 px-5 py-5 border-2 border-transparent hover:border-pink text-pink rounded-xl disabled:hidden group text-l lg:px-3 lg:h-5 lg:mr-1"
                >
                수정하기
                </button>
                
                <button className="flex items-center justify-center h-5 px-5 py-5 text-white bg-white bg-opacity-50 border-none lex rounded-xl effect-none group text-l opacity-90 hover:bg-opacity-30 lg:px-3 lg:h-5 lg:mr-1">
                    취소
                </button>
                </div>}
            </div>
        </>
    );
};

export default TypeInfo;
