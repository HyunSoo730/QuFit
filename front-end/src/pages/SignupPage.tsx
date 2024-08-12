import { MemberInfoDTO } from '@apis/types/request';
import { LogoSignup } from '@assets/svg';
import GenderAndBirthAndLocation from '@components/auth/GenderAndBirthAndLocation';
import MBTIAndBio from '@components/auth/MBTIAndBio';
import MyHobbyAndPersonality from '@components/auth/MyHobbyAndPersonality';
import Nickname from '@components/auth/Nickname';
import StepProcess from '@components/auth/StepProcess';
import TypeInfo from '@components/auth/TypeInfo';

import { registMember } from '@queries/useMemberQuery';
import { useAccessTokenStore } from '@stores/auth/signUpStore';
import { useState } from 'react';

export interface SignUpProps {
    onNext: (data: any) => void;
    registData: MemberInfoDTO;
}
const SignupPage = () => {
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
    const accessToken = useAccessTokenStore();
    const [step, setStep] = useState(0);
    const signup = registMember();
    return (
        <main className="flex flex-col items-center justify-center h-full bg-lightPurple-7">
            <div className="max-w-[69.5rem] w-[69.5rem] h-[28.75rem] rounded-3xl shadow-xl bg-white flex justify-between px-20 py-9 ">
                <div className="flex flex-col gap-8 ">
                    <LogoSignup width={'7rem'} />
                    <div className="flex flex-col gap-4">
                        <p className="text-5xl">SIGN UP </p>
                        <p className="text-sm"> 큐핏에 오신걸 환영해요.</p>
                    </div>
                </div>
                <div className="flex-col justify-between flex max-w-[24rem] w-[24rem] py-16 h-full">
                    <div className="flex justify-end w-full">
                        <StepProcess count={step} />
                    </div>
                    {step === 0 && (
                        <Nickname
                            registData={registerData}
                            onNext={(data) => {
                                setRegisterData(data as MemberInfoDTO);
                                setStep(1);
                            }}
                        />
                    )}

                    {step === 1 && (
                        <GenderAndBirthAndLocation
                            registData={registerData}
                            onNext={(data) => {
                                setRegisterData(data as MemberInfoDTO);
                                setStep(2);
                            }}
                        />
                    )}
                    {step === 2 && (
                        <MyHobbyAndPersonality
                            registData={registerData}
                            onNext={(data) => {
                                setRegisterData(data as MemberInfoDTO);
                                setStep(3);
                            }}
                        />
                    )}
                    {step === 3 && (
                        <MBTIAndBio
                            registData={registerData}
                            onNext={(data) => {
                                setRegisterData(data as MemberInfoDTO);
                                setStep(4);
                            }}
                        />
                    )}
                    {step === 4 && (
                        <TypeInfo
                            registData={registerData}
                            onNext={(data) => {
                                setRegisterData(data as MemberInfoDTO);
                                setStep(5);
                            }}
                        />
                    )}

                    {step === 7 && <div>끝났어 </div>}
                </div>
            </div>
        </main>
    );
};

export default SignupPage;
