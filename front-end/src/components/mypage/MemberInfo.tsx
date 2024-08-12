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

interface InfoProps {
    onNext: (data: MemberData | TypeData | MemberInfoDTO) => void;
    registData: MemberInfoDTO;
}
const MemberInfo = ({ onNext, registData }: InfoProps) => {
    const { values, messages, valids, handleChange, handleCheckboxGroupChange, handleSubmit } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });
    return (
        <>
            <p className="py-5 text-4xl font-bold text-white mx-7">내 정보</p>
            <div className="flex flex-col">
            <div className="flex flex-row gap-20 mx-5">
                <div className="flex flex-col w-1/2 px-10 gap-7">
                    {/* 닉네임 */}
                    <div className="flex flex-col">
                        <Input name="nickname" label="닉네임" value={values.nickname} onChange={handleChange} />
                        {values.nickname && <Message valid={valids.nickname}>{messages.nickname}</Message>}
                    </div>
                    {/* 태어난연도 */}
                    <div className="flex flex-col">
                        <Select
                            name="birthYear"
                            label="태어난 연도"
                            value={values.birthYear?.toString() || ''}
                            onChange={handleChange}
                            options={generateSelectOptions(1980, 2000)}
                        />
                        {values.birthYear && <Message valid={valids.birthYear}>{messages.birthYear}</Message>}
                    </div>

                    {/* 자기소개 */}
                    <div className="flex flex-col">
                        <TextArea name="bio" label="자기소개" value={values.bio} onChange={handleChange} rows={10} />
                        {values.bio && <Message valid={valids.bio}>{messages.bio}</Message>}
                    </div>

                    {/* 성별 */}
                    <div className="flex flex-col">
                        <SingleTagGroup label="성별" name="gender" onChange={handleChange} value={values.gender}>
                            {GENDER.map((gender) => (
                                <SingleTag key={gender.param} value={gender.param}>
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
                                <SingleTag key={location.code} value={location.code}>
                                    {location.name}
                                </SingleTag>
                            ))}
                        </SingleTagGroup>
                        {values.locationId && <Message valid={valids.location}>{messages.location}</Message>}
                    </div>
                    {/* 취미 */}
                    <div className="flex flex-col">
                        <MultipleTagGroup
                            label="나의 취미"
                            onChange={(values) => handleCheckboxGroupChange('memberHobbyTags', values)}
                            values={values.memberHobbyTags}
                        >
                            {HOBBY.map((hobby) => (
                                <>
                                    <MultipleTag key={hobby} value={hobby}>
                                        {hobby}
                                    </MultipleTag>
                                </>
                            ))}
                        </MultipleTagGroup>
                        {values.memberHobbyTags && (
                            <Message valid={valids.memberHobbyTags}>{messages.memberHobbyTags}</Message>
                        )}
                    </div>
                    {/* 성격 */}
                    <div className="flex flex-col">
                        <MultipleTagGroup
                            label="나의 성격"
                            onChange={(values) => handleCheckboxGroupChange('memberPersonalityTags', values)}
                            values={values.memberPersonalityTags}
                        >
                            {PERSONALITY.map((personality) => (
                                <MultipleTag key={personality} value={personality}>
                                    {personality}
                                </MultipleTag>
                            ))}
                        </MultipleTagGroup>
                        {values.memberPersonalityTags && (
                            <Message valid={valids.memberPersonalityTags}>{messages.memberPersonalityTags}</Message>
                        )}
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
                                <SingleTag key={mbti} value={mbti}>
                                    {mbti}
                                </SingleTag>
                            ))}
                        </SingleTagGroup>
                        {values.memberMBTITag && (
                            <Message valid={valids.memberMBTITag}>{messages.memberMBTITag}</Message>
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
                        valids.nickname &&
                        valids.birthYear &&
                        valids.bio &&
                        valids.gender &&
                        valids.memberHobbyTags &&
                        valids.memberPersonalityTags &&
                        valids.memberMBTITag
                    )
                }
                className="flex items-center justify-center h-4 px-5 py-5 border-2 border-transparent hover:border-pink text-pink rounded-xl disabled:hidden group text-l lg:px-3 lg:h-5 lg:mr-1"
                >
                다음페이지
                </button>
                <button
                className="flex items-center justify-center h-5 px-5 py-5 text-white bg-white bg-opacity-50 border-none lex rounded-xl effect-none group text-l opacity-90 hover:bg-opacity-30 lg:px-3 lg:h-5 lg:mr-1">
                취소
                </button>
            </div> 
                            
            </div>          
        </>
    );
};

export default MemberInfo;
