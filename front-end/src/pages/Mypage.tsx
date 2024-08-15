// - 내 정보 입력: 닉네임,성별, 자기 소개, 성격태그, mbti, 거주 지역, 태어난 년도, 취미 태그(다중 선택)
// - 이상형 입력:  성격 태그, mbti, 지역

import { MemberInfoDTO } from '@apis/types/request';
import MemberInfo from '@components/mypage/MemberInfo';
import TypeInfo from '@components/mypage/TypeInfo';
import { updateMemberInfoMutation, useMemberQuery, useProfileMutation } from '@queries/useMemberQuery';
import { useState, useEffect } from 'react';
import { LOCATION } from '@components/mypage/SignupConstants';
import { div } from 'three/webgpu';

const MyPage = () => {
    const { data } = useMemberQuery();
    const getProfileData = useProfileMutation();
    const [registerData, setRegisterData] = useState<MemberInfoDTO>({
        nickname: '',
        locationId: null,
        birthYear: null,
        gender: '',
        bio: '',
        memberMBTITag: '',
        memberHobbyTags: [],
        memberPersonalityTags: [],
        typeAgeMax: null,
        typeAgeMin: null,
        typeMBTITags: [],
        typeHobbyTags: [],
        typePersonalityTags: [],
    });

    const findLocationCodeByName = (name: string) => {
        const location = LOCATION.find((location) => location.name === name);
        return location?.code;
    }; // 지역을 이름으로 받아서 지역코드로 바꿔놔요,,

    const defaultProfileImage = '@assets/png/defaultProfile.png';
    const [profileImage, setProfileImage] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (data) {
            const responseData = data.data;
            const locationCode = findLocationCodeByName(responseData.location);
            const transformedData: MemberInfoDTO = {
                nickname: responseData.nickname,
                locationId: locationCode ? parseInt(locationCode) : null,
                birthYear: responseData.birthYear,
                gender: responseData.gender,
                bio: responseData.bio,
                memberMBTITag: responseData.memberMBTITag,
                memberHobbyTags: responseData.memberHobbyTags,
                memberPersonalityTags: responseData.memberPersonalityTags,
                typeAgeMax: responseData.typeAgeMax,
                typeAgeMin: responseData.typeAgeMin,
                typeMBTITags: responseData.typeMBTI,
                typeHobbyTags: responseData.typeHobbyTags,
                typePersonalityTags: responseData.typePersonalityTags,
            };
            setProfileImage(responseData.profileImage ? responseData.profileImage : defaultProfileImage);
            setEmail(responseData.email);
            setRegisterData(transformedData);
        }
    }, [data]);

    const [step, setStep] = useState<'MemberInfo' | 'TypeInfo'>('MemberInfo');
    const [isUpdateInfo, setIsUpdateInfo] = useState<boolean>(false);
    const updateMemberInfo = updateMemberInfoMutation();
    const handleUpdateMemberInfoButton = (data: any) => {
        // 회원정보 수정 요청 보내기
        updateMemberInfo.mutate(data);
    };
    return (
        <main className="h-full">
            {step === 'MemberInfo' && (
                <div>
                    <p className="py-5 text-4xl font-bold text-white mx-7">내 정보</p>
                    <div className="flex flex-col items-center gap-4 mt-3 mb-10">
                        {/*프로필 사진 */}
                        {getProfileData.isPending ? (
                            <div className="w-40 h-40 rounded-full bg-smokeWhite/20 animate-pulse" />
                        ) : (
                            <img src={profileImage} alt="Profile" className="object-cover w-40 h-40 rounded-full" />
                        )}
                        {/*메일 */}
                        <div className="text-xl font-bold text-white">{email}</div>
                        {/* 수정 버튼 */}
                        <button
                            onClick={() => setIsUpdateInfo(!isUpdateInfo)}
                            className="h-8 px-4 py-1 text-white rounded bg-white/30"
                        >
                            {!isUpdateInfo ? '프로필 수정 🪄' : '취소'}{' '}
                        </button>
                        {profileImage === defaultProfileImage ? (
                            <button
                                onClick={() => getProfileData.mutate()}
                                className="h-8 px-4 py-1 text-white rounded bg-pink/70"
                            >
                                AI에게 프로필 생성받기 🤖
                            </button>
                        ) : null}
                    </div>
                    <MemberInfo
                        registData={registerData}
                        onNext={(data) => {
                            setRegisterData(data as MemberInfoDTO);
                            setStep('TypeInfo');
                        }}
                        isUpdate={isUpdateInfo}
                    />
                </div>
            )}
            {step === 'TypeInfo' && (
                <div>
                    <TypeInfo
                        registData={registerData}
                        isUpdate={isUpdateInfo}
                        onNext={(data: MemberInfoDTO) => {
                            console.log(isUpdateInfo);
                            if (isUpdateInfo) {
                                {
                                    handleUpdateMemberInfoButton(data);
                                }
                                setIsUpdateInfo(false);
                            }
                            setStep('MemberInfo');
                        }}
                    />
                </div>
            )}
        </main>
    );
};

export default MyPage;
