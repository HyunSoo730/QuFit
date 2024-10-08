import { HTTP_STATUS } from '@apis/ApiConstants';
import { getKakaoAccessToken, login } from '@apis/auth/AuthApi';
import { PATH } from '@routers/PathConstants';
import { useSetKaKaoAccessTokenStore } from '@stores/auth/signUpStore';
import { useSetAccessTokenStore } from '@stores/auth/tokenStore';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useIsPendingStore from '@stores/auth/isPendingStore';
import LottieComponent from '@components/common/LottieComponent';
import heartLoader from '@assets/lottie/heartLoader.json';

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const authCode = searchParams.get('code');
    const setKaKaoAccessToken = useSetKaKaoAccessTokenStore();
    const setAccessToken = useSetAccessTokenStore();
    const setIsPending = useIsPendingStore((state) => state.setIsPending);

    useEffect(() => {
        getKakaoAccessToken(authCode!)
            .then((response) => {
                setKaKaoAccessToken(response.data.access_token);
                login(response.data.access_token)
                    .then((response) => {
                        const bearerToken = response.headers.authorization;
                        setAccessToken(bearerToken);
                        navigate(PATH.MAIN);
                    })
                    .catch((error) => {
                        if (isAxiosError(error)) {
                            if (error.response?.data.status === HTTP_STATUS.UNAUTHORIZED) {
                                if (error.response.data.errorMessage === '회원 가입이 필요합니다.') {
                                    navigate(PATH.SIGN_UP);
                                } else if (error.response.data.errorMessage === '가입 승인 대기 중인 계정입니다.') {
                                    -setIsPending(true);
                                    navigate(PATH.INTRODUCTION);
                                }
                            }
                        }
                    });
            })
            .catch((error) => {
                if (error.response.data.error_code === 'KOE320') {
                    // navigate();
                    navigate(PATH.INTRODUCTION);
                    setKaKaoAccessToken('');
                    localStorage.removeItem('accessToken');
                    console.log(error);
                }
            });
    }, []);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-black ">
            <LottieComponent
                animationData={heartLoader}
                speed={1}
                isPaused={false}
                isStopped={false}
                loop={true}
                init={0}
                end={100}
                className="w-32 h-32"
            />
        </div>
    );
};

export default KakaoRedirectPage;
