import { useEffect, useRef, useState } from 'react';
import LottieComponent from '@components/common/LottieComponent';
import loader from '@assets/lottie/loader.json';
import { BoxIcon, RecommendRoomIcon, FilterIcon } from '@assets/svg/main';
import RoomCard from '@components/main/RoomCard';
import { RecommendRoomModal } from '@modals/main/RoomModal';
import useModal from '@hooks/useModal';
import { useVideoRoomQuery } from '@queries/useVideoQuery';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@routers/PathConstants';
import useMember from '@hooks/useMember';
import { qufitAcessTokenA, qufitAcessTokenB, qufitAcessTokenC } from '@apis/axios';

interface RoomsInfoProps {
    videoRoomId: number;
    videoRoomName: string;
    videoRoomHobby: string[];
    videoRoomPersonality: string[];
    maxParticipants: number;
    curMCount: number;
    curWCount: number;
    mainTag: string;
}

const MainPage = () => {
    const navigate = useNavigate();

    const { open, Modal, close } = useModal();

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [roomsList, setRoomsList] = useState<RoomsInfoProps[]>([]);

    const endRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const getRoomsData = useVideoRoomQuery(page, 24, 1);
    const RoomsInfoList = getRoomsData.data?.data?.videoRoomList;

    const { member } = useMember();

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
            if (entries[0].intersectionRect.height === 0 && entries[0].intersectionRect.width !== 0 && hasMore) {
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

    const handleOpenModalButton = () => {
        open();
    };

    return (
        <div className="absolute z-10 flex flex-col w-full h-full px-16 pt-16 pb-10 lg:px-16 lg:py-10 md:px-14 sm:px-10 sm:py-8 xs:px-10 xs:py-8">
            <div className="flex flex-col">
                {/* 나중에 삭제 여기부터  */}
                <div className="flex gap-4">
                    <button
                        className="mb-3 text-3xl font-bold leading-none border-2 text-smokeWhite font-barlow"
                        onClick={() => localStorage.setItem('accessToken', qufitAcessTokenA)}
                    >
                        1번으로 로그인
                    </button>
                    <button
                        className="mb-3 text-3xl font-bold leading-none border-2 text-smokeWhite font-barlow"
                        onClick={() => localStorage.setItem('accessToken', qufitAcessTokenB)}
                    >
                        2번으로 로그인
                    </button>
                    <button
                        className="mb-3 text-3xl font-bold leading-none border-2 text-smokeWhite font-barlow"
                        onClick={() => localStorage.setItem('accessToken', qufitAcessTokenC)}
                    >
                        3번으로 로그인
                    </button>
                </div>
                {/* 여기까지 */}
                <h1 className="mb-3 text-6xl font-bold leading-none text-smokeWhite font-barlow opacity-90 lg:text-5xl lg:mb-0 sm:text-4xl xs:text-4xl">
                    Look who's here !
                </h1>
                <h1 className="text-6xl font-bold leading-none text-smokeWhite font-barlow opacity-90 lg:text-5xl sm:text-4xl xs:text-4xl">
                    Welcome,{' '}
                    <span className="text-5xl text-pink lg:text-4xl sm:text-4xl xs:text-4xl">{member?.nickname}</span>
                </h1>
            </div>
            <div className="flex items-center justify-between w-full mt-14 mb-7 lg:mt-8 lg:mb-4 xs:mb-4 xs:mt-8">
                <div className="flex w-full">
                    <button
                        onClick={() => navigate(PATH.CREATE_ROOM)}
                        className="flex items-center justify-center h-12 px-5 mr-5 bg-white rounded-full w-36 group bg-opacity-20 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0"
                    >
                        <BoxIcon className="w-7 mr-2.5 group-hover:fill-white xs:mr-0" />
                        <span className="font-medium text-smokeWhite opacity-80 group-hover:text-white group-hover:opacity-100 xs:hidden">
                            방 만들기
                        </span>
                    </button>
                    <button
                        onClick={handleOpenModalButton}
                        className="flex items-center justify-center w-40 h-12 px-5 bg-white rounded-full group bg-opacity-20 lg:scale-90 xs:scale-90 xs:w-14 xs:px-0"
                    >
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
                ref={scrollRef}
                className="relative grid w-full h-full grid-cols-3 gap-8 overflow-y-auto scrollbar-hide md:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-6 sm:grid-cols-2 xs:grid-cols-1"
            >
                {roomsList &&
                    roomsList.map((data: RoomsInfoProps) => (
                        <RoomCard
                            key={data.videoRoomId}
                            id={data.videoRoomId}
                            title={data.videoRoomName.length === 0 ? '✨ 큐핏의 화살을 맞은 방' : data.videoRoomName}
                            hobbyTags={data.videoRoomHobby}
                            personalityTags={data.videoRoomPersonality}
                            maxParticipants={data.maxParticipants}
                            curMCount={data.curMCount}
                            curWCount={data.curWCount}
                            mainTag={data.mainTag}
                            isButton={true}
                        />
                    ))}
                {getRoomsData.isLoading && (
                    <div className="absolute flex items-center justify-center w-full h-full">
                        <LottieComponent
                            animationData={loader}
                            speed={1}
                            isPaused={false}
                            isStopped={false}
                            loop={true}
                            init={0}
                            end={100}
                            className="fixed w-32 h-32"
                        />
                    </div>
                )}
                <div ref={endRef} />
            </div>
            <Modal>
                <RecommendRoomModal onClose={close} />
            </Modal>
        </div>
    );
};

export default MainPage;
