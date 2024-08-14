import { useOtherIdxStore, useSetRoomIdStore } from '@stores/video/roomStore';
import useRoom from '@hooks/useRoom';
import ParticipantVideo from '@components/video/ParticipantVideo';
import { useEffect, useRef, useState } from 'react';
import { useProblemsStore, useSetProblemsStore, useSetResultsStore } from '@stores/video/gameStore';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '@apis/axios';
import useTimer from '@hooks/useTimer';
import useMember from '@hooks/useMember';
import { PATH } from '@routers/PathConstants';
import { GROUP_VIDEO_END_SEC } from '@components/game/Constants';
import MoveRoomModal from '@modals/video/MoveRoomModal';
import useModal from '@hooks/useModal';
import Loading from '@components/game/step/Loading';
import BalanceGame from '@components/game/step/BalanceGame';
import GamePlay from '@components/game/step/GamePlay';
import GameResult from '@components/game/step/GameResult';
import GameEnd from '@components/game/step/GameEnd';
import GameIntro from '@components/game/step/GameIntro';
import { afterSubscribe, connect, disConnect, publishSocket } from '@utils/websocketUtil';
import * as StompJs from '@stomp/stompjs';

type RoomStep =
    | 'active'
    | 'loading'
    | 'game'
    | 'play'
    | 'result'
    | 'resultLoading1'
    | 'resultLoading2'
    | 'resultLoading3'
    | 'end';
type beforeResult = {
    balanceGameChoiceId: number;
    balanceGameId: number;
    choiceContent: string;
    choiceNum: number;
    memberId: number;
    videoRoomId: number;
};
function GroupVideoPage() {
    const roomMax = 8;
    // const { videoRoomId } = useParams();
    const [roomStep, setRoomStep] = useState<RoomStep>('active');
    const { createRoom, joinRoom, leaveRoom, setPrivateRoom, participants, otherGenderParticipants } = useRoom();
    // const { joinRoom, setPrivateRoom, participants, otherGenderParticipants } = useRoom();
    const [gameStage, setGameStage] = useState(-1);
    const setRoomId = useSetRoomIdStore();
    const setResults = useSetResultsStore();
    const problems = useProblemsStore();
    const setProblems = useSetProblemsStore();
    const client = useRef<StompJs.Client | null>(null);
    const { member } = useMember();
    const { roomId } = useParams();
    const [isMeeting, setIsMeeting] = useState(true);

    const otherIdx = useOtherIdxStore();

    const handleConfirmModal = async () => {
        if (member?.gender === 'm') {
            const response = await instance.get(`qufit/video/recent`, {
                params: { hostId: member.memberId },
            });
            navigate(PATH.PERSONAL_VIDEO(Number(response.data['videoRoomId: '])));
        } else if (member?.gender === 'f') {
            const response = await instance.get(`qufit/video/recent`, {
                params: { hostId: otherGenderParticipants[otherIdx].id },
            });
            joinRoom(response.data['videoRoomId: ']);
            navigate(PATH.PERSONAL_VIDEO(Number(response.data['videoRoomId: '])));
        }
        setPrivateRoom();
    };
    const onConnect = () => {
        client.current?.subscribe(`/sub/game/${roomId}`, (message) => {
            const response = JSON.parse(message.body);

            afterSubscribe(response, '게임 시작을 성공했습니다.', () => {
                setRoomStep('loading');
                setProblems(response.result);
            });
            afterSubscribe(response, '선택지 선택을 시작했습니다.', () => {
                setRoomStep('play');
                setGameStage((prev) => prev + 1);
            });

            afterSubscribe(response, '게임 결과를 조회했습니다.', () => {
                const processedResult = response.result.reduce((acc: any, result: beforeResult) => {
                    if (!acc[result.balanceGameId]) {
                        acc[result.balanceGameId] = {};
                    }
                    acc[result.balanceGameId][result.memberId] = result.choiceNum;
                    return acc;
                }, {});
                console.log(processedResult);
                setResults(processedResult);
            });

            afterSubscribe(response, '게임이 종료됐습니다.', () => {
                console.log(response);
                setRoomStep('end');
            });
        });
    };
    const navigate = useNavigate();
    const { isHost } = useRoom();

    const startGame = () => {
        publishSocket(
            {
                isGameStart: true,
            },
            client,
            Number(roomId),
        );
        setRoomStep('loading');
    };

    const startPlay = () => {
        publishSocket(
            {
                isChoiceStart: true,
            },
            client,
            Number(roomId),
        );
        // setRoomStep('play');
    };

    const endChoice = (choice: any) => {
        publishSocket(choice, client, Number(roomId));
    };

    const endGame = () => {
        //웹소켓 발신
        publishSocket(
            {
                isGameEnd: true,
            },
            client,
            Number(roomId),
        );
        setRoomStep('end');
    };

    useEffect(() => {
        setRoomId(Number(roomId)); //나중에 param에서 따와야함
        connect(client, onConnect);
        return () => disConnect(client);
    }, []);
    const { open, close, Modal } = useModal();
    const restSec = useTimer(GROUP_VIDEO_END_SEC, () => {
        leaveRoom(Number(roomId));
        if (member?.gender === 'm') {
            createRoom({
                videoRoomName: '개인방',
                maxParticipants: 2,
                mainTag: '',
                videoRoomHobbies: [],
                videoRoomPersonalities: [],
            });
        }
        setIsMeeting(false);
        open();
    });

    return (
        <>
            <Modal>
                <MoveRoomModal
                    onClose={close}
                    onClick={handleConfirmModal}
                    message={'잠시 후 일대일 미팅으로 이동됩니다.'}
                />
            </Modal>
            {isMeeting && (
                <div className="flex flex-col justify-between w-full h-screen ">
                    <ParticipantVideo roomMax={roomMax} gender="m" status="meeting" participants={participants} />
                    <div className="flex flex-col items-center justify-center py-4">
                        {roomStep === 'active' && <GameIntro onNext={startGame} />}
                        {roomStep === 'loading' && <Loading onNext={() => setRoomStep('game')} />}
                        {roomStep === 'game' && <BalanceGame onNext={startPlay} />}
                        {roomStep === 'play' && (
                            <GamePlay
                                id={problems[gameStage].balanceGameId}
                                title={problems[gameStage].content}
                                scenario1={problems[gameStage].scenario1}
                                scenario2={problems[gameStage].scenario2}
                                onNext={(choice: any) => {
                                    endChoice(choice);
                                    setRoomStep('resultLoading1');
                                }}
                            />
                        )}
                        {roomStep === 'resultLoading1' && (
                            <Loading
                                onNext={() => {
                                    isHost &&
                                        publishSocket(
                                            {
                                                getResult: true,
                                            },
                                            client,
                                            Number(roomId),
                                        );
                                    setRoomStep('resultLoading2');
                                }}
                            />
                        )}
                        {roomStep === 'resultLoading2' && (
                            <Loading
                                onNext={() => {
                                    setRoomStep('result');
                                }}
                            />
                        )}

                        {roomStep === 'result' && (
                            <GameResult
                                id={problems[gameStage].balanceGameId}
                                title={problems[gameStage].content}
                                scenario1={problems[gameStage].scenario1}
                                scenario2={problems[gameStage].scenario2}
                                gameStage={gameStage}
                                onStop={endGame}
                                onNext={startPlay}
                            />
                        )}
                        {roomStep === 'end' && <GameEnd restSec={restSec} />}
                    </div>
                    <ParticipantVideo roomMax={roomMax} gender="f" status="meeting" participants={participants} />
                </div>
            )}
        </>
    );
}

export default GroupVideoPage;

{
    /* <div className="hidden">
                    {participants.map((participant) => (
                        <AudioComponent
                            key={participant.nickname}
                            track={
                                participant.info.audioTrackPublications.values().next().value?.audioTrack || undefined
                            }
                        />
                    ))}
                </div> */
}
