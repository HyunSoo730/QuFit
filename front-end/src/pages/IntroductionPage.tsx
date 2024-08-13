import Saturn from '@assets/gif/Saturn.gif';
import LottieComponent from '@components/common/LottieComponent';
import ShinningStar from '@assets/lottie/shiningStar.json';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@routers/PathConstants';

const IntroductionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black w-screen h-screen flex">
            <div className="w-full h-full absolute flex items-center justify-center">
                <img src={Saturn} alt="토성 이미지" />
            </div>
            <div className="bg-darkPurple bg-opacity-20 h-full w-1/2 effect-blur flex flex-col justify-center pl-36">
                <div className="">
                    <p className=" font-barlow text-[10rem] font-bold text-smokeWhite leading-none text-left">
                        <span className="text-pink">Q</span>uick
                    </p>
                    <p className=" font-barlow text-[10rem] font-bold text-smokeWhite leading-none text-left">
                        <span className="text-pink">F</span>it
                    </p>
                    <p className=" font-barlow text-[10rem] font-bold text-smokeWhite leading-none text-left">Love </p>
                </div>
                <button className="w-fit text-smokeWhite text-2xl border-2 border-smokeWhite px-12 py-5 mt-36">
                    더 알아보기
                </button>
            </div>
            <div className="flex z-10 absolute items-center top-14 right-20">
                <button
                    onClick={() => navigate(PATH.SIGN_UP)}
                    className="font-barlow text-smokeWhite text-3xl font-medium"
                >
                    Sign Up
                </button>
                <div className="w-1 h-8 bg-smokeWhite mx-10" />
                <button
                    onClick={() => navigate('/auth/kakao')}
                    className="font-barlow text-smokeWhite text-3xl font-medium"
                >
                    <span className="text-yellow">Kakao</span> Log In
                </button>
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
        </div>
    );
};

export default IntroductionPage;
