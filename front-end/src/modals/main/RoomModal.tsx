import { useRecommendedVideoRoomQuery } from '@queries/useVideoQuery';
import { PATH } from '@routers/PathConstants';
import { useNavigate } from 'react-router-dom';
import LottieComponent from '@components/common/LottieComponent';
import loader from '@assets/lottie/loader.json';

interface RecommendRoomModalProps {
    onClose: () => void;
}
interface RoomEntryModalProps {
    onClose: () => void;
    joinRoom: (roomId: number) => void;
    leaveRoom: (roomId: number) => void;
    roomId: number;
}

export const RecommendRoomModal = ({ onClose }: RecommendRoomModalProps) => {
    const navigate = useNavigate();
    const { data: recommendedRoomsData, isLoading } = useRecommendedVideoRoomQuery(0);

    return (
        <>
            {!isLoading ? (
                recommendedRoomsData === undefined ? (
                    <div className="flex flex-col items-center justify-center px-14 py-14 rounded-2xl bg-smokeWhite bg-opacity-90">
                        <p className="text-xl font-medium text-black whitespace-pre-wrap">
                            지금 나에게 딱 맞는 방이 없습니다😂
                        </p>
                        <p className="mt-2 text-lg text-black whitespace-pre-wra">직접 만들어 보는건 어때요?</p>
                        <div className="flex">
                            <button
                                onClick={() => navigate(PATH.CREATE_ROOM)}
                                className="px-10 py-2 mt-8 mr-4 text-lg font-medium text-white rounded-full bg-pink"
                            >
                                방 만들기
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 mt-8 text-lg text-white bg-black rounded-full bg-opacity-10"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                ) : (
                    navigate(PATH.RECOMMEND_ROOM)
                )
            ) : (
                <div className="flex flex-col items-center justify-center px-14 py-14">
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
                </div>
            )}
        </>
    );
};

export const RoomEntryModal = ({ onClose, joinRoom, leaveRoom, roomId }: RoomEntryModalProps) => {
    return (
        <div>
            <div className="text-white">하위 나는 방 입장 모달</div>
            <button
                onClick={() => {
                    joinRoom(roomId);
                }}
                className="mr-10 text-lg text-black bg-pink"
            >
                입장할게
            </button>
            <button
                onClick={() => {
                    leaveRoom(roomId);
                }}
                className="mr-10 text-lg text-black bg-white"
            >
                나갈게
            </button>
            <button onClick={onClose} className="text-white">
                걍 끌게
            </button>
        </div>
    );
};
