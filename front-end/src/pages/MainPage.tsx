import { useState } from 'react';
import { UserInfoDummy, RoomsInfoDummy } from '@dummy/Dummy';
import { BoxIcon, RecommendRoomIcon, FilterIcon } from '@assets/svg/main';
import RoomCard from '@components/main/RoomCard';
import { CreateRoomModal, RoomEntryModal } from '@modals/main/RoomModal';
import useModal from '@hooks/useModal';

const MainPage = () => {
    const { open, Modal, close } = useModal();
    const [openModal, setOpenModal] = useState('');

    const useHover = () => {
        const [isHovered, setIsHovered] = useState(false);
        const handleMouseOver = () => setIsHovered(true);
        const handleMouseOut = () => setIsHovered(false);

        return { isHovered, handleMouseOver, handleMouseOut };
    };

    const boxHover = useHover();
    const recommendHover = useHover();

    const handleOpenModalButton = (props: string) => {
        setOpenModal(props);
        open();
    };

    return (
        <div className="absolute z-10 flex flex-col w-full h-full px-20 py-12 lg:px-16 lg:py-10 md:px-14 sm:px-10 sm:py-8 xs:px-10 xs:py-8">
            <div className="flex flex-col">
                <h1 className="mb-3 text-6xl font-bold leading-none text-white font-barlow opacity-90 lg:text-5xl lg:mb-0 sm:text-4xl xs:text-4xl">
                    Look who's here !
                </h1>
                <h1 className="text-6xl font-bold leading-none text-white font-barlow opacity-90 lg:text-5xl sm:text-4xl xs:text-4xl">
                    Welcome,{' '}
                    <span className="text-5xl text-darkBlack lg:text-4xl sm:text-4xl xs:text-4xl">
                        {UserInfoDummy.nickname}
                    </span>
                </h1>
            </div>
            <div className="flex items-center justify-between w-full mt-10 mb-7 lg:mt-8 lg:mb-4 xs:mb-4 xs:mt-8">
                <div className="flex">
                    <button
                        onClick={() => handleOpenModalButton('create')}
                        onMouseOver={boxHover.handleMouseOver}
                        onMouseOut={boxHover.handleMouseOut}
                        className="flex items-center w-16 h-16 pl-3 mr-5 duration-100 ease-in-out bg-white transition-width bg-opacity-40 rounded-2xl hover:w-44 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2"
                    >
                        <BoxIcon className="min-w-10 max-w-10" />
                        {boxHover.isHovered ? (
                            <>
                                <p className="pb-0.5 text-2xl font-medium text-white min-w-28">방만들기</p>
                            </>
                        ) : (
                            <></>
                        )}
                    </button>
                    <button
                        onMouseOver={recommendHover.handleMouseOver}
                        onMouseOut={recommendHover.handleMouseOut}
                        className="flex items-center w-16 h-16 pl-3 duration-100 ease-in-out bg-white transition-width bg-opacity-40 rounded-2xl hover:w-52 lg:scale-90 xs:scale-90"
                    >
                        <RecommendRoomIcon className="min-w-10 max-w-10 ml-0.5" />
                        {recommendHover.isHovered ? (
                            <>
                                <p className="pb-0.5 text-2xl font-medium text-white min-w-36">방 추천받기</p>
                            </>
                        ) : (
                            <></>
                        )}
                    </button>
                </div>
                <button className="relative flex items-center justify-center w-48 border-4 rounded-full h-14 border-lightPurple-5 effect-indyBlue lg:scale-90 xs:scale-90 xs:w-14">
                    <div className="z-10 flex items-center">
                        <FilterIcon className="w-8" />
                        <p className="pb-0.5 ml-2 text-2xl font-medium text-white xs:hidden">태그 필터</p>
                    </div>
                    <div className="absolute z-0 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-48 h-14 rounded-full bg-indyBlue opacity-30 xs:scale-90 xs:w-14" />
                </button>
            </div>
            <div
                onClick={() => handleOpenModalButton('entry')}
                className="grid w-full h-full grid-cols-3 gap-8 overflow-y-auto scrollbar-hide md:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-6 sm:grid-cols-2 xs:grid-cols-1"
            >
                {RoomsInfoDummy.map((data) => (
                    <RoomCard key={data.id} id={data.id} title={data.title} tags={data.tags} />
                ))}
            </div>
            <Modal>
                {openModal === 'create' ? <CreateRoomModal onClose={close} /> : <RoomEntryModal onClose={close} />}
            </Modal>
        </div>
    );
};

export default MainPage;
