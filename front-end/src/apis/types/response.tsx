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
