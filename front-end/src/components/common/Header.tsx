import { PATH } from '@routers/PathConstants';
import { NavLink } from 'react-router-dom';
import { Logo, LogoM, ChatButtonIcon, MyPageIcon, NotiIcon } from '@assets/svg';

const Header = () => {
    return (
        <div className="w-full z-10 aspect-header relative rounded-t-[2.5rem] effect-layout-2 lg:rounded-t-[2rem] md:h-24 sm:h-24 xs:h-24">
            <div className="absolute z-10 flex items-center justify-between w-full h-full px-16 sm:px-10 md:px-14 lg:px-16 xs:px-10">
                <NavLink to={PATH.MAIN}>
                    <div>
                        <Logo className="relative w-[6.25rem] lg:w-24 md:w-24 sm:w-0 sm:h-0 sm:static xs:w-0 xs:h-0 xs:static" />
                        <LogoM className="w-0 sm:w-14 sm:relative xs:w-14 xs:relative" />
                    </div>
                </NavLink>

                <div className="flex">
                    <NavLink to={PATH.CHATTING}>
                        <ChatButtonIcon className="mr-8 w-11 lg:w-10 lg:mr-6 md:w-10 md:mr-6 sm:w-10 sm:mr-5 xs:w-10 xs:mr-5" />
                    </NavLink>

                    <NavLink to={PATH.MY_PAGE}>
                        <MyPageIcon className="mr-8 w-11 lg:w-10 lg:mr-6 md:w-10 md:mr-6 sm:w-10 sm:mr-5 xs:w-10 xs:mr-5" />
                    </NavLink>
                    <div className="relative flex">
                        <NotiIcon className="w-11 lg:w-10 md:w-10 sm:w-10 xs:w-10" />
                        <div className="absolute right-2.5 top-2 lg:right-2 lg:top-2 md:right-2 md:top-2 sm:right-2 sm:top-2 xs:right-2 xs:top-2">
                            <span className="relative flex w-2.5 aspect-square lg:w-2 md:w-2 sm:w-2 xs:w-2">
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-pink animate-ping"></span>
                                <span className="relative inline-flex w-2.5 rounded-full aspect-square bg-pink"></span>
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
