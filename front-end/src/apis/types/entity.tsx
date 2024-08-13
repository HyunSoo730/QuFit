export type TagCateg = 'PERSONALITY' | 'HOBBY' | 'MBTI';

export interface Tag {
    id: number;
    tagCategory: TagCateg;
    tagName: string;
}

export interface Location {
    id: number;
    Si: string;
}
