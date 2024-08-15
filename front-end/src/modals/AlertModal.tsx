interface alertModalProps {
    content: string;
    onClose: () => void;
}

const alertModal = ({ content, onClose }: alertModalProps) => {
    return (
        <div className="flex flex-col items-center justify-center px-10 py-10 shadow-xl bg-smokeWhite rounded-3xl">
            <p className="text-xl text-center text-black whitespace-pre-wrap">{content}</p>
            <button
                onClick={onClose}
                className="px-10 py-2 mt-8 font-bold text-white rounded-full bg-pink bg-opacity-80"
            >
                확인
            </button>
        </div>
    );
};

export default alertModal;
