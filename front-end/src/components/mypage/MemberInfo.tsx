import { GENDER, HOBBY, LOCATION, MBTI, PERSONALITY } from '@components/mypage/SignupConstants';
import useForm from '@hooks/useForm';
import Input from '@components/common/input/Input';
import TextArea from '@components/common/input/TextArea';
import Select from '@components/common/select/Select';
import { MemberData, MemberInfoDTO, TypeData } from '@apis/types/request';
import MultipleTag from '@components/mypage/MultipleTag';
import SingleTag from '@components/mypage/SingleTag';
import MultipleTagGroup from '@components/mypage/MultipleTagGroup';
import SingleTagGroup from '@components/mypage/SingleTagGroup';
import Message from '@components/mypage/Message';
import signupValidate from '@utils/signupValidate';
import generateSelectOptions from '@utils/generateSelectOptions';
import { useEffect } from 'react';

interface InfoProps {
    onNext: (data: MemberData | TypeData | MemberInfoDTO) => void;
    registData: MemberInfoDTO;
    isUpdate: boolean;
}
const MemberInfo = ({ onNext, registData, isUpdate }: InfoProps) => {
    const { values, messages, valids, setValues, handleChange, handleCheckboxGroupChange, handleSubmit } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });
    useEffect(() => {
        setValues(registData); // registData 변경 시 values를 업데이트
    }, [registData, setValues]);
    return (
        <>
            <div className="flex flex-col mx-10">
                <div className="flex flex-row gap-20 ">
                    <div className="flex flex-col w-1/2 px-10 gap-7">
                        {/* 닉네임 */}
                        <div className="flex flex-col">
                            <Input
                                name="nickname"
                                label="닉네임"
                                value={values.nickname}
                                onChange={handleChange}
                                isUpdate={isUpdate}
                            />
                            {values.nickname && <Message valid={valids.nickname}>{messages.nickname}</Message>}
                        </div>
                        {/* 태어난연도 */}
                        <div className="flex flex-col w-40">
                            <Select
                                name="birthYear"
                                label="태어난 연도"
                                value={values.birthYear?.toString() || ''}
                                onChange={handleChange}
                                options={generateSelectOptions(1980, 2000)}
                                isUpdate={isUpdate}
                            />
                            {values.birthYear && <Message valid={valids.birthYear}>{messages.birthYear}</Message>}
                        </div>

                        {/* 자기소개 */}
                        <div className="flex flex-col">
                            <TextArea
                                name="bio"
                                label="자기소개"
                                value={values.bio}
                                onChange={handleChange}
                                isUpdate={isUpdate}
                                rows={10}
                            />
                            {values.bio && <Message valid={valids.bio}>{messages.bio}</Message>}
                        </div>

                        {/* 성별 */}
                        <div className="flex flex-col">
                            <SingleTagGroup label="성별" name="gender" onChange={handleChange} value={values.gender}>
                                {GENDER.map((gender) => (
                                    <SingleTag key={gender.param} value={gender.param} disabled={!isUpdate}>
                                        {gender.text}
                                    </SingleTag>
                                ))}
                            </SingleTagGroup>
                            {values.gender && <Message valid={valids.gender}>{messages.gender}</Message>}
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2 gap-4">
                        <div className="flex flex-col">
                            {/* 지역 */}
                            <SingleTagGroup
                                label="지역"
                                name="locationId"
                                onChange={handleChange}
                                value={values.locationId?.toString() || ''}
                            >
                                {LOCATION.map((location) => (
                                    <SingleTag key={location.code} value={location.code} disabled={!isUpdate}>
                                        {location.name}
                                    </SingleTag>
                                ))}
                            </SingleTagGroup>
                            {values.locationId && <Message valid={valids.location}>{messages.location}</Message>}
                        </div>
                        {/* MBTI(선택) */}
                        <div className="flex flex-col">
                            <SingleTagGroup
                                label="나의 MBTI(선택)"
                                name="memberMBTITag"
                                onChange={handleChange}
                                value={values.memberMBTITag!}
                            >
                                {MBTI.map((mbti) => (
                                    <SingleTag key={mbti.tag_name} value={mbti.tag_name} disabled={!isUpdate}>
                                        {mbti.tag_name}
                                    </SingleTag>
                                ))}
                            </SingleTagGroup>
                            {values.memberMBTITag && (
                                <Message valid={valids.memberMBTITag}>{messages.memberMBTITag}</Message>
                            )}
                        </div>
                        {/* 취미 */}
                        <div className="flex flex-col">
                            <MultipleTagGroup
                                label="나의 취미 ▾"
                                onChange={(values) => handleCheckboxGroupChange('memberHobbyTags', values)}
                                values={values.memberHobbyTags}
                            >
                                {HOBBY.map((hobby) => (
                                    <>
                                        <MultipleTag key={hobby.tag_name} value={hobby.tag_name} isUpdate={isUpdate}>
                                            {hobby.tag_name}
                                        </MultipleTag>
                                    </>
                                ))}
                            </MultipleTagGroup>
                            {values.memberHobbyTags && (
                                <Message valid={valids.memberHobbyTags}>{messages.memberHobbyTags}</Message>
                            )}
                        </div>
                        {/* 성격 */}
                        <div className="z-10 flex flex-col">
                            <MultipleTagGroup
                                label="나의 성격 ▾"
                                onChange={(values) => handleCheckboxGroupChange('memberPersonalityTags', values)}
                                values={values.memberPersonalityTags}
                            >
                                {PERSONALITY.map((personality) => (
                                    <MultipleTag
                                        key={personality.tag_name}
                                        value={personality.tag_name}
                                        isUpdate={isUpdate}
                                    >
                                        {personality.tag_name}
                                    </MultipleTag>
                                ))}
                            </MultipleTagGroup>
                            {values.memberPersonalityTags && (
                                <Message valid={valids.memberPersonalityTags}>{messages.memberPersonalityTags}</Message>
                            )}
                        </div>
                    </div>
                </div>
                <div className="sticky flex flex-row justify-end gap-2 pr-5 bottom-10">
                    <button
                        onClick={handleSubmit}
                        disabled={
                            isUpdate
                                ? !(
                                      valids.nickname &&
                                      valids.birthYear &&
                                      valids.bio &&
                                      valids.gender &&
                                      valids.memberHobbyTags &&
                                      valids.memberPersonalityTags &&
                                      valids.memberMBTITag
                                  )
                                : false
                        }
                        className="flex items-center justify-center h-4 px-5 py-5 border-2 border-transparent hover:border-pink text-pink rounded-xl disabled:hidden group text-l lg:px-3 lg:h-5 lg:mr-1"
                    >
                        다음페이지
                    </button>
                    {isUpdate && (
                        <div>
                            <button className="flex items-center justify-center h-5 px-5 py-5 text-white bg-white bg-opacity-50 border-none lex rounded-xl effect-none group text-l opacity-90 hover:bg-opacity-30 lg:px-3 lg:h-5 lg:mr-1">
                                취소
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MemberInfo;
