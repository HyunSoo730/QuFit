import { faker, fakerKO } from '@faker-js/faker';

interface UserInfoProps {
    nickname: string;
}

interface RoomInfoProps {
    id: string;
    title: string;
    tags: string[];
}

interface FriendInfoProps {
    // id: number;
    otherMemberId: number;
    nickname: string;
    profileImage: string;
}

export const UserInfoDummy: UserInfoProps = {
    nickname: faker.lorem.word() + fakerKO.person.firstName(),
};

export const RoomsInfoDummy: RoomInfoProps[] = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    title: fakerKO.lorem.sentence(),
    tags: ['개발', '운동', '강아지', '러닝메이트', '태그5', '태그6ddddddddd'].slice(0, Math.floor(Math.random() * 6)),
}));

// export const FriendsInfoDummy: FriendInfoProps[] = Array.from({ length: 10 }, () => ({
//     id: faker.string.uuid(),
//     nickname: fakerKO.lorem.word() + fakerKO.person.firstName(),
//     profileImage: [
//         'https://i.pinimg.com/200x/36/20/6e/36206ec041c802876469d0959ccd97ae.jpg',
//         'https://i.pinimg.com/236x/df/3c/4d/df3c4dcf15935d0111426bb28b12d9b1.jpg',
//         'https://i.pinimg.com/236x/6f/16/f1/6f16f17340ba194e07dab3aa5fa9c50a.jpg',
//         'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MjRfMjky/MDAxNjE5MjMxNjk0MzU4.fePbRs10YH0ZVjrz3MGBOHNWFItPfKKOcBcoyc8ZOUgg.2_ZPsEDVbgT90-zmoPQDLm-StnsQ85u3ZWVtJDcQu_4g.JPEG.maryjane1440/%EC%9D%B8%EC%8A%A4%ED%83%80%ED%94%84%EC%82%AC%EC%B6%94%EC%B2%9C.jpg?type=w800',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgeOrP5FsKKblJQP_ftX3hdumnQwpfplfhaQ&s',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Ev-FL1joscDAGVHCi1BZ8_5EfRNbhIqgaw&s',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLL0sRaZnFXFqRPEZojh72NPu9bUc1c9YPCA&s',
//         'https://cdnweb01.wikitree.co.kr/webdata/editor/202310/19/img_20231019174409_8a1cbf07.webp',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKLvdQnjZSdgBimyKYRSI1FR2GQRvbrnKAw&s',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVNS5NlBZHubRpbUFcaLlgUY6DguOhV8XDzQ&s',
//         'https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTJfMTE0/MDAxNjE1NTI1Nzg3NTM2.YdDPheyL4Aqnxq7AX8qqNWND-d3zYd91ENVMQ6S50cYg.4r5rWKmBSN5A_BVt8cfkwFQ-swmwMpa27L23z8n-8Ywg.JPEG.sj330035/%ED%94%84%EC%82%AC.jpeg?type=w800',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbPqBoOjJD5Cixdp_NcHQQnJr-fsymACO7fg&s',
//     ][Math.floor(Math.random() * 12)],
//     chatRoom: [{ lastMessage: fakerKO.lorem.sentence(), unreadCount: Math.floor(Math.random() * 20) }],
// }));

export const FriendsInfoDummy: FriendInfoProps[] = [
    {
        otherMemberId: 223,
        nickname: 'admin',
        profileImage: 'https://i.pinimg.com/236x/df/3c/4d/df3c4dcf15935d0111426bb28b12d9b1.jpg',
    },
    {
        otherMemberId: 21,
        nickname: '김싸피',
        profileImage: 'https://i.pinimg.com/200x/36/20/6e/36206ec041c802876469d0959ccd97ae.jpg',
    },
    {
        otherMemberId: 226,
        nickname: '이싸피',
        profileImage: 'https://i.pinimg.com/200x/36/20/6e/36206ec041c802876469d0959ccd97ae.jpg',
    },
    {
        otherMemberId: 227,
        nickname: '최싸피',
        profileImage: 'https://i.pinimg.com/200x/36/20/6e/36206ec041c802876469d0959ccd97ae.jpg',
    },
];
