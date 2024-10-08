import { MemberInfoDTO } from '@apis/types/request';
import { LogoSignup } from '@assets/svg';
import GenderAndBirthAndLocation from '@components/auth/GenderAndBirthAndLocation';
import MBTIAndBio from '@components/auth/MBTIAndBio';
import MyHobbyAndPersonality from '@components/auth/MyHobbyAndPersonality';
import Nickname from '@components/auth/Nickname';
import StepProcess from '@components/auth/StepProcess';
import TypeInfo from '@components/auth/TypeInfo';
import TypeAge from '@components/auth/TypeAge';
import SignUpEnd from '@components/auth/SignUpEnd';
import { useState } from 'react';
import { useKaKaoAccessTokenStore } from '@stores/auth/signUpStore';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@routers/PathConstants';
import { registMember } from '@queries/useMemberQuery';

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
    const accessToken = useKaKaoAccessTokenStore();
    const signup = registMember();
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const welcomeMessage = registerData.nickname
        ? `큐핏에 오신걸 환영해요, ${registerData.nickname}님!`
        : '큐핏에 오신걸 환영해요.';

    return (
        <main className="flex flex-col items-center justify-center h-full bg-lightPurple-7">
            <div className="max-w-[69.5rem] w-[69.5rem] h-[28.75rem] rounded-3xl shadow-xl bg-white flex justify-between px-20 py-9 ">
                {step === 6 ? (
                    <div className="flex justify-center w-full">
                        <SignUpEnd 
                        registData={registerData}
                        onNext={(data: MemberInfoDTO) => {
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
                            navigate(PATH.INTRODUCTION);
                        }
                        }
                            />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-8 ">
                            <LogoSignup width={'7rem'} />
                            <div className="flex flex-col gap-4">
                                <p className="text-5xl font-medium font-barlow">SIGN UP </p>
                                <p className="text-md">{welcomeMessage}</p>
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
                                <TypeAge
                                    registData={registerData}
                                    onNext={(data) => {
                                        setRegisterData(data as MemberInfoDTO);
                                        setStep(5);
                                    }}
                                />
                            )}

                            {step === 5 && (
                                <TypeInfo
                                    registData={registerData}
                                    onNext={(data) => {
                                        setRegisterData(data as MemberInfoDTO);
                                        setStep(6);
                                    }}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default SignupPage;
