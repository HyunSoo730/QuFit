interface NicknameProps {}

const Nickname = ({}: NicknameProps) => {
    return (
        <div className="flex items-center gap-3">
            <p>큐핏에서 사용할 닉네임을 입력해주세요</p>
        </div>
    );
};

export default Nickname;
