import * as StompJs from '@stomp/stompjs';
import { qufitAcessTokenA, qufitAcessTokenB, qufitAcessTokenC, qufitAcessTokenD } from '@apis/axios';

// interface ConnectProps {
//     client: { current: StompJs.Client | null };
//     onConnect: () => void;
// }

export const afterSubscribe = (response: any, message: string, func: any) => {
    if (response.message === message) {
        func();
    }
};

export let accessToken = '';
if (location.port === '3000') {
    accessToken = qufitAcessTokenA;
} else if (location.port === '3001') {
    accessToken = qufitAcessTokenB;
} else if (location.port === '3002') {
    accessToken = qufitAcessTokenC;
} else if (location.port === '3003') {
    accessToken = qufitAcessTokenD;
}

export const publishSocket = (data: any, client: { current: StompJs.Client | null }, roomId: number) => {
    client.current?.publish({
        destination: `/pub/game/${roomId}`,
        body: JSON.stringify(data),
    });
};

export const connect = (client: { current: StompJs.Client | null }, onConnect: () => void) => {
    try {
        client.current = new StompJs.Client({
            brokerURL: import.meta.env.VITE_WEBSOCKET_BASE_URL,
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            debug: function () {
                // console.log('소켓 디버그:', str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: onConnect,
        });

        if (client.current) {
            client.current.activate();
        } else {
            console.log('클라이언트가 초기화되지 않았습니다.');
        }
    } catch (err) {
        console.log(err);
    }
};
// 연결 끊기
export const disConnect = (client: { current: { deactivate: () => void } | null }) => {
    if (client.current === null) {
        return;
    }
    client.current.deactivate();
};
