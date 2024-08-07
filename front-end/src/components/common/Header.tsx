import { PATH } from '@routers/PathConstants';
import { NavLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '@assets/lottie/twincle.json';
import { Logo, LogoM, ChatButtonIcon, MyPageIcon, NotiIcon } from '@assets/svg';

const Header = () => {
    return (
        <div className="w-full aspect-header relative rounded-t-[2.75rem] border-y-2 border-x-4 effect-layout-2 border-lightPurple-3 lg:rounded-t-[2rem] md:h-24 sm:h-24 xs:h-24">
            <div className="absolute z-10 flex items-center justify-between w-full h-full px-20 sm:px-10 md:px-14 lg:px-16 xs:px-10">
                <NavLink to={PATH.MAIN}>
                    <div>
                        <Logo className="relative w-[7.1875rem] lg:w-24 md:w-24 sm:w-0 sm:h-0 sm:static xs:w-0 xs:h-0 xs:static" />
                        <LogoM className="w-0 sm:w-16 sm:relative xs:w-16 xs:relative" />
                        <Lottie
                            animationData={animationData}
                            className="absolute w-52 left-9 top-10 lg:w-32 lg:left-12 md:w-32 md:left-12 sm:w-24 sm:left-3 xs:w-24 xs:left-3"
                        />
                    </div>
                </NavLink>

                <div className="flex">
                    <NavLink to={PATH.CHATTING}>
                        <ChatButtonIcon className="mr-10 w-14 lg:w-12 lg:mr-6 md:w-12 md:mr-6 sm:w-12 sm:mr-5 xs:w-12 xs:mr-5" />
                    </NavLink>

                    <NavLink to={PATH.MY_PAGE}>
                        <MyPageIcon className="mr-10 w-14 lg:w-12 lg:mr-6 md:w-12 md:mr-6 sm:w-12 sm:mr-5 xs:w-12 xs:mr-5" />
                    </NavLink>
                    <div className="relative flex">
                        <NotiIcon className="w-10 lg:w-7 md:w-7 sm:w-7 xs:w-7" />
                        <div className="absolute right-1 top-3 lg:right-1 lg:top-3 md:right-1 md:top-3 sm:right-1 sm:top-3 xs:right-1 xs:top-3">
                            <span className="relative flex w-3 aspect-square lg:w-2 md:w-2 sm:w-2 xs:w-2">
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-pink animate-ping"></span>
                                <span className="relative inline-flex w-3 rounded-full aspect-square bg-pink"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full bg-whitePink opacity-20 rounded-t-[2.75rem] z-0 lg:rounded-t-[2rem]" />
        </div>
    );
};

export default Header;
