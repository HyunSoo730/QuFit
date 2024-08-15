import { useState } from 'react';
import { BackIcon, RecommendRoomIcon } from '@assets/svg/main';
import { useRecommendedVideoRoomQuery } from '@queries/useVideoQuery';
import RoomCard from '@components/main/RoomCard';
import { useNavigate } from 'react-router-dom';
import LottieComponent from '@components/common/LottieComponent';
import loader from '@assets/lottie/loader.json';

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

const RecommendedRoomPage = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);

    const { data: getRecommendedRoomsData, isLoading } = useRecommendedVideoRoomQuery(page);
    const recommendedRoomsInfoList = getRecommendedRoomsData?.data?.videoRoomList;

    const handleOnClick = () => {
        if (page > 0 && recommendedRoomsInfoList === undefined) {
            setPage(0);
        } else {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div className="absolute flex flex-col w-full h-full px-16 py-12 ">
            <button onClick={() => navigate(-1)} className="flex items-center mb-8">
                <BackIcon className="w-5 h-5 mr-2.5" />
                <span className="text-xl opacity-80 text-smokeWhite">이전으로</span>
            </button>
            <div className="flex items-center mb-14">
                <RecommendRoomIcon className="w-9 h-9 mr-2.5" />
                <span className="text-4xl font-bold opacity-80 text-smokeWhite">방 추천받기</span>
            </div>

            <div className="relative grid w-full h-full grid-cols-3 gap-8 px-10 py-10 overflow-y-auto bg-black bg-opacity-30 rounded-3xl scrollbar-hide md:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-6 sm:grid-cols-2 xs:grid-cols-1">
                {recommendedRoomsInfoList !== undefined ? (
                    recommendedRoomsInfoList.map((data: RoomsInfoProps) => (
                        <RoomCard
                            key={`${data.videoRoomId}${data.videoRoomName}`}
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
                    ))
                ) : !isLoading ? (
                    <div className="absolute flex flex-col items-center justify-center w-full h-full">
                        <p className="text-2xl text-smokeWhite">
                            방이 <span className="text-4xl font-medium text-pink animate-pulse">텅</span> 비었어요!
                        </p>
                        <p className="mt-2 opacity-60 text-smokeWhite">나와 딱 맞는 방이 아직 없어요.</p>
                    </div>
                ) : (
                    <></>
                )}
                {isLoading && (
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
            </div>

            <button
                onClick={handleOnClick}
                className="px-10 py-4 mt-8 ml-auto text-2xl font-medium text-white rounded-2xl w-fit bg-pink bg-opacity-80"
            >
                다시 추천받기
            </button>
        </div>
    );
};

export default RecommendedRoomPage;
