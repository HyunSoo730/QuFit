// - 내 정보 입력: 닉네임,성별, 자기 소개, 성격태그, mbti, 거주 지역, 태어난 년도, 취미 태그(다중 선택)
// - 이상형 입력:  성격 태그, mbti, 지역

import { MemberInfoDTO } from '@apis/types/request';
import MemberInfo from '@components/mypage/MemberInfo';
import TypeInfo from '@components/mypage/TypeInfo';
import { registMember } from '@queries/useMemberQuery';
import { useAccessTokenStore } from '@stores/auth/signUpStore';
import { useState } from 'react';

const MyPage = () => {
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
    const [step, setStep] = useState<'MemberInfo' | 'TypeInfo'>('MemberInfo');
    const accessToken = useAccessTokenStore();
    const signup = registMember();
    return (
        <main className="h-full">
            {step === 'MemberInfo' && (
                <MemberInfo
                    registData={registerData}
                    onNext={(data) => {
                        setRegisterData(data as MemberInfoDTO);
                        setStep('TypeInfo');
                    }}
                />
            )}
            {step === 'TypeInfo' && (
                <TypeInfo
                    registData={registerData}
                    onNext={(data: MemberInfoDTO) =>
                        signup.mutate(
                            { data, token: accessToken || '' },
                            {
                                onSuccess: (response) => {
                                    console.log(response);
                                },
                                onError: (error) => {
                                    console.log(error);
                                },
                            },
                        )
                    }
                />
            )}
        </main>
    );
};

export default MyPage;
