interface MoveRoomModalProps {
    onClose: () => void;
    onClick: () => void;
}

const MoveRoomModal = ({ onClose, onClick }: MoveRoomModalProps) => {
    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-Dark_Layout-100 bg-opacity-60" onClick={onClose} />
            <div className="absolute flex flex-col items-center gap-5 -translate-x-1/2 -translate-y-1/2 border-none p-9 bg-Light_Layout-400 text-Light_Text_Name top-1/2 left-1/2 rounded-2xl">
                <p className="text-white">미팅 시간이 종료되었어요. 다음 방으로 이동해주세요.</p>
                <div className="flex w-full gap-3">
                    <button
                        onClick={() => {
                            onClick();
                            onClose();
                        }}
                        className="w-full text-smokeWhite h-9 bg-Light_Layout-100 text-Light_Text_AboutMe text-base rounded-[2rem] "
                    >
                        이동하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default MoveRoomModal;
