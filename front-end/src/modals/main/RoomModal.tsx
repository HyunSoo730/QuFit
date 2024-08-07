interface CreateRoomModalProps {
    onClose: () => void;
}

export const CreateRoomModal = ({ onClose }: CreateRoomModalProps) => {
    return (
        <div>
            <div>하위 나는 방 만들기 모달</div>
            <button onClick={onClose}>나가</button>
        </div>
    );
};

export const RoomEntryModal = ({ onClose }: CreateRoomModalProps) => {
    return (
        <div>
            <div>하위 나는 방 입장 모달</div>
            <button onClick={onClose}>나가</button>
        </div>
    );
};
