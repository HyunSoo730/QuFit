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
    return (
        <div>
            <div>하위 나는 방 추천 모달</div>
            <button onClick={onClose}>나가</button>
        </div>
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
