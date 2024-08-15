import { BrokenHeart, SuccessHeart } from '@assets/svg';

interface PersonalResultProps {
    participants: any;
    results: any;
    problems: any;
}

const PersonalResult = ({ participants, results, problems }: PersonalResultProps) => {
    // result [문제번호[stage]] [balanceGameId] = {회원아이디: 시나리오}
    const firstParticipant = participants[0];
    const secondParticipant = participants[1];

    return (
        <>
            {participants.length === 2 && (
                <div className="flex w-full gap-6 p-8 bg-gray-100 flex-start flex-nowrap ">
                    {Object.values(results).map((result: any, problemIdx: number) => (
                        <div className="flex flex-col h-full gap-[2rem] min-w-[320px] ">
                            <h2 className="text-3xl font-bold text-center text-white ">
                                {problems[problemIdx].content}
                            </h2>
                            <div
                                key={problemIdx}
                                className="relative flex flex-col py-[32px] gap-[1rem] min-h-[25rem] items-center w-full justify-between p-6 sm:p-8 md:p-10 text-white bg-transparent h-[360px] effect-whitePink rounded-[30px]"
                            >
                                <p className="text-2xl font-semibold sm:text-xl ">{firstParticipant.nickname}</p>
                                <div className="flex items-center justify-center w-full h-8 min-h-[64px] px-2 py-3 rounded-3xl sm:h-10 md:h-12 sm:p-3 md:p-4 sm:text-lg md:text-xl bg-opacity-50 sm:w-48 md:w-56 bg-darkPurple">
                                    <p className="text-2xl">
                                        {result[firstParticipant.id] === 1
                                            ? problems[problemIdx].scenario1
                                            : problems[problemIdx].scenario2}
                                    </p>
                                </div>
                                <div className="my-2 text-xl sm:my-4 sm:text-2xl">
                                    {result[firstParticipant.id] === result[secondParticipant.id] ? (
                                        <SuccessHeart width={'3rem'} />
                                    ) : (
                                        <BrokenHeart width={'3rem'} />
                                    )}
                                </div>
                                <div className="flex items-center justify-center w-full h-8 min-h-[64px] px-2 py-3 rounded-3xl sm:h-10 md:h-12 sm:p-3 md:p-4 sm:text-lg md:text-xl bg-opacity-50 sm:w-48 md:w-56 bg-darkPurple">
                                    <p className="text-2xl">
                                        {result[secondParticipant.id] === 1
                                            ? problems[problemIdx].scenario1
                                            : problems[problemIdx].scenario2}
                                    </p>
                                </div>
                                <span className="mt-2 text-2xl font-semibold sm:mt-4 sm:text-xl">
                                    {secondParticipant.nickname}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default PersonalResult;
