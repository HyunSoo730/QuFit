import { useEffect, useRef, useState } from 'react';
import { BoxIcon, RecommendRoomIcon, FilterIcon } from '@assets/svg/main';
import RoomCard from '@components/main/RoomCard';
import { CreateRoomModal, RoomEntryModal } from '@modals/main/RoomModal';
import useModal from '@hooks/useModal';
import { useVideoRoomQuery } from '@queries/useVideoQuery';

interface RoomsInfoProps {
    videoRoomId: number;
    videoRoomName: string;
    videoRoomHobby: string[];
}

const MainPage = () => {
    const { open, Modal, close } = useModal();
    const [openModal, setOpenModal] = useState('');

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [roomsList, setRoomsList] = useState<RoomsInfoProps[]>([]);

    const endRef = useRef<HTMLDivElement>(null);

    const getRoomsData = useVideoRoomQuery(page, 12, 1);
    const RoomsInfoList = getRoomsData.data?.data?.videoRoomList;

    useEffect(() => {
        if (getRoomsData.isError) {
            setHasMore(false);
        }
    }, [getRoomsData.isError]);

    useEffect(() => {
        if (RoomsInfoList) {
            setRoomsList((prev) => [...prev, ...RoomsInfoList]);
        }
    }, [RoomsInfoList]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                console.log('패칭');
                setPage((prev) => {
                    return prev + 1;
                });
            }
        });

        if (endRef.current) {
            observer.observe(endRef.current);
        }

        return () => {
            if (endRef.current) {
                observer.unobserve(endRef.current);
            }
        };
    }, [hasMore]);

    const handleOpenModalButton = (props: string) => {
        setOpenModal(props);
        open();
    };

    return (
        <div className="absolute z-10 flex flex-col w-full h-full px-16 pt-16 pb-10 lg:px-16 lg:py-10 md:px-14 sm:px-10 sm:py-8 xs:px-10 xs:py-8">
            <div className="flex flex-col">
                <h1 className="mb-3 text-6xl font-bold leading-none text-smokeWhite font-barlow opacity-90 lg:text-5xl lg:mb-0 sm:text-4xl xs:text-4xl">
                    Look who's here !
                </h1>
                <h1 className="text-6xl font-bold leading-none text-smokeWhite font-barlow opacity-90 lg:text-5xl sm:text-4xl xs:text-4xl">
                    Welcome, <span className="text-5xl text-pink lg:text-4xl sm:text-4xl xs:text-4xl">김싸피</span>
                </h1>
            </div>
            <div className="flex items-center justify-between w-full mt-14 mb-7 lg:mt-8 lg:mb-4 xs:mb-4 xs:mt-8">
                <div className="flex w-full">
                    <button
                        onClick={() => handleOpenModalButton('create')}
                        className="flex items-center justify-center h-12 px-5 mr-5 bg-white rounded-full w-36 group bg-opacity-20 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0"
                    >
                        <BoxIcon className="w-7 mr-2.5 group-hover:fill-white xs:mr-0" />
                        <span className="font-medium text-smokeWhite opacity-80 group-hover:text-white group-hover:opacity-100 xs:hidden">
                            방 만들기
                        </span>
                    </button>
                    <button className="flex items-center justify-center w-40 h-12 px-5 bg-white rounded-full group bg-opacity-20 lg:scale-90 xs:scale-90 xs:w-14 xs:px-0">
                        <RecommendRoomIcon className="w-7 mr-2.5 group-hover:fill-white xs:mr-0" />
                        <span className="font-medium text-smokeWhite opacity-80 group-hover:text-white group-hover:opacity-100 xs:hidden">
                            방 추천받기
                        </span>
                    </button>
                </div>
                <button className="relative flex items-center justify-center h-12 border-[0.1875rem] rounded-full w-36 border-smokeWhite hover:animate-pulse lg:scale-90 xs:scale-90 xs:w-14">
                    <div className="z-10 flex items-center">
                        <FilterIcon className="w-6" />
                        <p className="pb-0.5 ml-2 text-xl font-medium text-smokeWhite xs:hidden">Filter</p>
                    </div>
                </button>
            </div>
            <div
                id="scrollableDiv"
                onClick={() => handleOpenModalButton('entry')}
                className="grid w-full h-full grid-cols-3 gap-8 overflow-y-auto scrollbar-hide md:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-6 sm:grid-cols-2 xs:grid-cols-1"
            >
                {roomsList &&
                    roomsList.map((data: RoomsInfoProps) => (
                        <RoomCard
                            key={data.videoRoomId}
                            id={data.videoRoomId}
                            title={data.videoRoomName}
                            tags={data.videoRoomHobby}
                        />
                    ))}
                <div ref={endRef} />
            </div>
            <Modal>
                {openModal === 'create' ? <CreateRoomModal onClose={close} /> : <RoomEntryModal onClose={close} />}
            </Modal>
        </div>
    );
};

export default MainPage;
