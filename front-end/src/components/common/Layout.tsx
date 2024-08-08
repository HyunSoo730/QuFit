import LottieComponent from '@components/common/LottieComponent';
import Header from '@components/common/Header';
import FireFly from '@assets/lottie/firefly.json';
import StarFalling from '@assets/lottie/starFalling.json';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const isLocation = location.pathname;

    const background = isLocation === '/main' ? 'bg-mainPageBg' : 'bg-black';

    return (
        <div
            className={`relative flex flex-col items-center justify-center max-w-screen h-screen bg-cover px-16 py-4 ${background} lg:px-20 md:py-10 sm:py-12 sm:px-6 xs:py-12 xs:px-6`}
        >
            <Header />
            <div className="w-full z-10 aspect-layout effect-layout rounded-b-[2.5rem] relative md:h-full lg:rounded-b-[2rem] sm:h-full xs:h-full">
                <Outlet />
            </div>
            {isLocation === '/main' ? (
                <>
                    <LottieComponent
                        animationData={FireFly}
                        speed={0.3}
                        isPaused={false}
                        isStopped={false}
                        loop={true}
                        init={0}
                        end={100}
                        className="absolute left-[-0.625rem] z-0 w-64 h-40 transform bottom-5 -scale-x-100"
                    />
                    <LottieComponent
                        animationData={FireFly}
                        speed={0.3}
                        isPaused={false}
                        isStopped={false}
                        loop={true}
                        init={0}
                        end={100}
                        className="absolute right-0 z-0 w-56 bottom-10"
                    />
                </>
            ) : (
                <>
                    <LottieComponent
                        animationData={StarFalling}
                        speed={0.3}
                        isPaused={false}
                        isStopped={false}
                        loop={true}
                        init={0}
                        end={100}
                        className="absolute z-0 w-full h-full"
                    />
                </>
            )}
        </div>
    );
};

export default Layout;
