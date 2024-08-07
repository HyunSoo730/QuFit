import Header from '@components/common/Header';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const isLocation = location.pathname;

    const background = isLocation === '/main' ? 'bg-mainPageBg' : 'bg-chatPageBg';

    return (
        <div
            className={`flex flex-col items-center justify-center w-screen h-screen bg-cover px-14 py-4 ${background} lg:px-20 md:py-10 sm:py-12 sm:px-6 xs:py-12 xs:px-6`}
        >
            <Header />
            <div className="w-full aspect-layout effect-layout border-b-4 border-x-2 border-lightPurple-4 rounded-b-[2.75rem] relative md:h-full lg:rounded-b-[2rem] sm:h-full xs:h-full">
                <Outlet />
                <div className="z-0 w-full h-full rounded-b-[2.75rem] bg-whitePink opacity-20 md:h-full lg:rounded-b-[2rem] sm:h-full xs:h-full" />
            </div>
        </div>
    );
};

export default Layout;
