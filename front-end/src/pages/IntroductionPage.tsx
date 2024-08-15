import Saturn from '@assets/gif/Saturn.gif';
import LottieComponent from '@components/common/LottieComponent';
import ShinningStar from '@assets/lottie/shiningStar.json';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@routers/PathConstants';
import { KAKAO_LOGIN_URL } from '@apis/ApiConstants';
import { Link } from 'react-router-dom';
import useModal from '@hooks/useModal';
import AlertModal from '@modals/AlertModal';
import { useEffect } from 'react';
import useIsPendingStore from '@stores/auth/isPendingStore';


const IntroductionPage = () => {
    const navigate = useNavigate();
    const {Modal, open, close } = useModal();

    const isPending = useIsPendingStore((state) => state.isPending);

    useEffect(() => {
        if (isPending) {
            open();
        }
    }, [isPending]);

    return (
        <div className="flex w-screen h-screen bg-black">
            <div className="absolute flex items-center justify-center w-full h-full">
                <img src={Saturn} alt="토성 이미지" />
            </div>
            <div className="flex flex-col justify-center w-1/2 h-full bg-darkPurple bg-opacity-20 effect-blur pl-36">
                <div className="">
                    <p className=" font-barlow text-[10rem] font-bold text-smokeWhite leading-none text-left">
                        <span className="text-pink">Q</span>uick
                    </p>
                    <p className=" font-barlow text-[10rem] font-bold text-pink leading-none text-left">Fit</p>
                    <p className=" font-barlow text-[10rem] font-bold text-smokeWhite leading-none text-left">Love </p>
                </div>
                <button className="px-12 py-5 text-2xl border-2 w-fit text-smokeWhite border-smokeWhite mt-36">
                    더 알아보기
                </button>
            </div>
            <div className="absolute z-10 flex items-center top-14 right-20">
                <button
                    onClick={() => navigate(PATH.SIGN_UP)}
                    className="text-3xl font-medium font-barlow text-smokeWhite"
                >
                    Sign Up
                </button>
                <div className="w-1 h-8 mx-10 bg-smokeWhite" />
                <Link to={KAKAO_LOGIN_URL}><button
    
                    className="text-3xl font-medium font-barlow text-smokeWhite"
                >
                    <span className="text-yellow">Kakao</span> Log In
                </button>
                </Link>
            </div>
            <LottieComponent
                animationData={ShinningStar}
                speed={1}
                isPaused={false}
                isStopped={false}
                loop={true}
                init={0}
                end={100}
                className="absolute z-0 w-full h-full"
            />

        <Modal>
            <AlertModal contents={`아직 관리자가 승인하지 않았어요ㅜㅜ`} onClose={close}/>
        </Modal>
        </div>
    );
};

export default IntroductionPage;
