import { GENDER, HOBBY, LOCATION, MBTI, PERSONALITY } from '@components/auth/SignupConstants';
import useForm from '@hooks/useForm';
import Input from '@components/common/input/Input';
import TextArea from '@components/common/input/TextArea';
import { MemberData, MemberInfoDTO, TypeData } from '@apis/types/request';
import MultipleTag from '@components/auth/MultipleTag';
import SingleTag from '@components/auth/SingleTag';
import MultipleTagGroup from '@components/auth/MultipleTagGroup';
import SingleTagGroup from '@components/auth/SingleTagGroup';
import Message from '@components/auth/Message';
import signupValidate from '@utils/signupValidate';

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
            <p className="text-4xl font-bold">회원가입</p>
            <div className="flex">
                <div className="flex flex-col w-1/2 gap-4 px-10">
                    {/* 닉네임 */}
                    <div className="flex flex-col">
                        <Input name="nickname" label="닉네임" value={values.nickname} onChange={handleChange} />
                        {values.nickname && <Message valid={valids.nickname}>{messages.nickname}</Message>}
                    </div>
                    {/* 태어난연도 */}
                    <div className="flex flex-col">
                        <Input
                            name="birthYear"
                            label="태어난 연도"
                            value={values.birthYear?.toString() || ''}
                            onChange={handleChange}
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
                        {values.locationId && <Message valid={valids.locationId}>{messages.locationId}</Message>}
                    </div>
                </div>

                <div className="flex flex-col w-1/2 gap-4">
                    {/* 취미 */}
                    <div className="flex flex-col">
                        <MultipleTagGroup
                            label="취미"
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
                            label="성격"
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
                            label="MBTI(선택)"
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
                className="absolute disabled:bg-white disabled:effect-none right-0 flex group items-center text-xl border-lightPurple-3 effect-purePink opacity-90 rounded-lg  bg-white justify-center mb-2 mr-3 border-none   hover:border-lightPurple-6  hover:effect-hotPink px-12 py-7 h-7 lg:px-4 lg:h-6 lg:mr-1.5 -translate-y-full"
            >
                다음페이지
            </button>
        </>
    );
};

export default MemberInfo;
