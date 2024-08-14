const PersonalResult = () => {
    return (
        <div className="flex items-center w-full p-8 bg-gray-100">
            <div className="flex flex-col items-center justify-center p-10 text-white bg-transparent effect-purePink rounded-2xl">
                <h2 className="p-3 text-lg font-bold text-center">밸런스 게임 결과</h2>
                <div className="flex space-x-12">
                    <div className="flex flex-col items-center space-y-2" id="m">
                        <span className="font-semibold">남자1</span>
                        <button className="flex items-center justify-center h-12 p-3 rounded-full max-h-16 bg-pink w-72 group bg-opacity-40 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0">
                            자신의 대답1
                        </button>
                        <button className="flex items-center justify-center h-12 p-3 rounded-full max-h-16 bg-pink w-72 group bg-opacity-40 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0">
                            자신의 대답2
                        </button>
                        <button className="flex items-center justify-center h-12 p-3 bg-white rounded-full max-h-16 w-72 group bg-opacity-20 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0">
                            자신의 대답3
                        </button>
                        <button className="flex items-center justify-center h-12 p-3 bg-white rounded-full max-h-16 w-72 group bg-opacity-20 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0">
                            자신의 대답4
                        </button>
                    </div>
                    <div className="flex flex-col items-center space-y-2" id="w">
                        <span className="font-semibold">여자1</span>
                        <button className="flex items-center justify-center h-12 p-3 rounded-full max-h-16 bg-pink w-72 group bg-opacity-40 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0">
                            상대의 대답1
                        </button>
                        <button className="flex items-center justify-center h-12 p-3 rounded-full max-h-16 bg-pink w-72 group bg-opacity-40 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0">
                            상대의 대답2
                        </button>
                        <button className="flex items-center justify-center h-12 p-3 bg-white rounded-full max-h-16 w-72 group bg-opacity-20 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0">
                            상대의 대답3
                        </button>
                        <button className="flex items-center justify-center h-12 p-3 bg-white rounded-full max-h-16 w-72 group bg-opacity-20 lg:scale-90 lg:mr-2 xs:scale-90 xs:mr-2 xs:w-14 xs:px-0">
                            상대의 대답4
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalResult;
