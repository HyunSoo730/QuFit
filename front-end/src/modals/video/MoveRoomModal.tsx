interface MoveRoomModalProps {
    onClick: () => void;
    onClose: () => void;
    message: string;
    /*
    다대다 -> 일대일 : '잠시 후 일대일 미팅으로 이동됩니다.'
    일대일 -> 일대일
    : '친구 추가 성공 ? 친구 추가에 성공하였습니다 : 친구 추가에 실패하였습니다.
       잠시 후 일대일 미팅으로 이동합니다.'
    일대일 -> 종료
    : '잠시 후 미팅이 종료됩니다. 수고하셨습니다? 감사합니다?'
    */
}

//친구 추가 로직

const MoveRoomModal = ({ onClose, message, onClick }: MoveRoomModalProps) => {
    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-Dark_Layout-100 bg-opacity-60" />
            <div className="flex flex-col items-center p-10 text-white bg-transparent effect-purePink rounded-2xl gap-9">
                <h2 className="flex p-3 text-lg font-bold text-center">{message}</h2>
                <button
                    onClick={() => {
                        onClick();
                        onClose();
                    }}
                    className="w-full text-smokeWhite h-9 bg-Light_Layout-100 text-Light_Text_AboutMe text-3xl font-bold rounded-[2rem] "
                >
                    이동하기
                </button>
            </div>
        </>
    );
};

export default MoveRoomModal;
