import ParticipantVideo from '@components/video/ParticipantVideo';
import { usePrivateParticipantsStore } from '@stores/video/roomStore';
import { useEffect, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import { connect, disConnect, publishSocket, afterSubscribe } from '@utils/websocketUtil';
import useMember from '@hooks/useMember';
import { useParams } from 'react-router-dom';

const PersonalVideoPage = () => {
    const privateParticipants = usePrivateParticipantsStore();
    const { roomId: roomIdParam } = useParams<{ roomId: string }>();   // ! 파라미터에서 긁어옴  
    const roomId = roomIdParam ? parseInt(roomIdParam, 10) : undefined;
    const client = useRef<StompJs.Client | null>(null);
    const { member } = useMember();
    const [friendRequestStatus, setFriendRequestStatus] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const onConnect = () => {
        console.log('=====================웹소켓 연결됨========================');
        setIsConnected(true);
        if (member?.memberId) {
            client.current?.subscribe(`/user/${member.memberId}/sub/game`, (message) => {
                const response = JSON.parse(message.body);
                afterSubscribe(response, '상대방이 친구를 수락했습니다.', () => {
                    setFriendRequestStatus('수락됨');
                });
                afterSubscribe(response, '상대방이 친구를 거절했습니다.', () => {
                    setFriendRequestStatus('거절됨');
                });
            });
        }

        if (roomId !== undefined) {
            client.current?.subscribe(`/sub/game/${roomId}`, (message) => {
                const response = JSON.parse(message.body);
                afterSubscribe(response, '친구가 추가되었습니다.', () => {
                    console.log('친구가 추가되었습니다.');
                });
            });
        }
    };

    useEffect(() => {
        console.log("Connecting to WebSocket...");
        if (roomId !== undefined) {
            connect(client, onConnect);
            return () => {
                console.log("Disconnecting from WebSocket...");
                disConnect(client);
                setIsConnected(false);
            };
        } else {
            console.error("========================================웹소켓 오류 발생=============================================");
        }
    }, [member?.memberId, roomId]);

    const handleFriendRequest = (isAccept: boolean) => {
        console.log(`Friend request ${isAccept ? 'accepted' : 'rejected'}`);
        const otherMemberId = 2; // 하드코딩된 친구 ID
        if (roomId !== undefined && member?.memberId) {
            console.log('Sending friend request message:', {
                isFriend: isAccept,
                memberId: member.memberId
            });
            publishSocket(
                {
                    isFriend: isAccept,
                    memberId: member.memberId
                },
                client,
                roomId
            );
        } else {
            console.error('roomId or member.memberId is undefined', { roomId, memberId: member?.memberId });
        }
    };
    
    const handleAddFriend = () => {
        console.log('=============== 친구 추가 버튼 클릭 =======================');
        const otherMemberId = 45; // 하드코딩된 친구 ID
        if (member?.memberId && roomId !== undefined) {
            console.log('Sending add friend message:', {
                memberA: member.memberId,
                memberB: otherMemberId
            });
            publishSocket(
                {
                    memberA: member.memberId,
                    memberB: otherMemberId
                },
                client,
                roomId
            );
        } else {
            console.error('memberId or roomId 오류', { memberId: member?.memberId, roomId });
        }
    };

    if (roomId === undefined) {
        return <div>Invalid room ID</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <h1>Personal Video Page</h1>
            <p>Room ID: {roomId}</p>
            <p>Member ID: {member?.memberId}</p>
            <p>웹소켓 연결상태: {isConnected ? 'Yes' : 'No'}</p>
            <ParticipantVideo roomMax={4} gender="m" participants={privateParticipants} status={'meeting'} />
            <ParticipantVideo roomMax={4} gender="f" participants={privateParticipants} status={'meeting'} />
            
            <div className="flex gap-4 mt-4">
                <button 
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                    onClick={() => handleFriendRequest(true)}
                >
                    친구 요청 수락
                </button>
                <button 
                    className="px-4 py-2 text-white bg-red-500 rounded"
                    onClick={() => handleFriendRequest(false)}
                >
                    친구 요청 거절
                </button>
                <button 
                    className="px-4 py-2 text-white bg-green-500 rounded"
                    onClick={handleAddFriend}
                >
                    친구 추가하기
                </button>
            </div>
            
            {friendRequestStatus && (
                <p className="mt-2">친구 요청 상태: {friendRequestStatus}</p>
            )}
        </div>
    );
};

export default PersonalVideoPage;