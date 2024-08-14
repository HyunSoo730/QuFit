import { Tag } from '@apis/types/entity';
import { Location } from '@apis/types/entity';

export interface MemberSigninDTO {
    email: string;
    nickname: string;
    profileImage: string;
    gender: string;
}

export interface MemberInfoDTO {
    memberId: number;
    email: string;
    nickname: string;
    location: Location;
    birthYear: number;
    gender: string;
    bio: string;
    profileImage: string;
    memberMBTITag: Tag;
    memberHobbyTags: Tag[];
    memberPersonalityTags: Tag[];
    typeAgeMax: number;
    typeAgeMin: number;
    typeMBTI: Tag[];
    typeHobby: Tag[];
    typePersonality: Tag[];
}

// 친구 정보 받기
export interface FriendInfoProps {
    id: number;
    nickname: string;
    profileImage: string;
}

export interface FriendListResponse {
    friendList: FriendInfoProps[];
    page: {
        totalElements: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}

export interface ChatListProps {
    chatRoomId: number;
    otherMemberNickname: string;
    profileImage: string;
    otherMemberId: number;
    lastMessage: string;
    unreadCount: number;
    lastMessageId?: string;
    lastMessageTime?: Date;
    lastReadMessageId?: string;
}
