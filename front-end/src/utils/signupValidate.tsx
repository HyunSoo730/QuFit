import { MemberInfoDTO } from '@apis/types/request';
import { MAX_NICKNAME_LENGTH, MIN_BIO_LENGTH, MIN_NICKNAME_LENGTH } from '@components/auth/SignupConstants';
interface ValidationResults {
    [key: string]: string;
}

interface ValidationBools {
    [key: string]: boolean;
}
const signupValidate = ({
    nickname,
    locationId,
    birthYear,
    gender,
    bio,
    memberMBTITag,
    memberHobbyTags,
    memberPersonalityTags,
    typeAgeMax,
    typeAgeMin,
    typeMBTITags,
    typeHobbyTags,
    typePersonalityTags,
}: MemberInfoDTO) => {
    const messages: ValidationResults = {};
    const valids: ValidationBools = {};

    const nicknameResult = validateNickname(nickname);
    messages.nickname = nicknameResult.message;
    valids.nickname = nicknameResult.valid;

    const locationResult = validateLocation(locationId);
    messages.location = locationResult.message;
    valids.location = locationResult.valid;

    const birthYearResult = validateBirthYear(birthYear);
    messages.birthYear = birthYearResult.message;
    valids.birthYear = birthYearResult.valid;

    const genderResult = validateGender(gender);
    messages.gender = genderResult.message;
    valids.gender = genderResult.valid;

    const bioResult = validateBio(bio);
    messages.bio = bioResult.message;
    valids.bio = bioResult.valid;

    const memberMBTITagResult = validateTags(memberMBTITag!);
    messages.memberMBTITag = memberMBTITagResult.message;
    valids.memberMBTITag = memberMBTITagResult.valid;

    const memberHobbyTagsResult = validateTags(memberHobbyTags);
    messages.memberHobbyTags = memberHobbyTagsResult.message;
    valids.memberHobbyTags = memberHobbyTagsResult.valid;

    const memberPersonalityTagsResult = validateTags(memberPersonalityTags);
    messages.memberPersonalityTags = memberPersonalityTagsResult.message;
    valids.memberPersonalityTags = memberPersonalityTagsResult.valid;

    const typeAgeMaxResult = validateAgeRange(typeAgeMax!);
    messages.typeAgeMax = typeAgeMaxResult.message;
    valids.typeAgeMax = typeAgeMaxResult.valid;

    const typeAgeMinResult = validateAgeRange(typeAgeMin!);
    messages.typeAgeMin = typeAgeMinResult.message;
    valids.typeAgeMin = typeAgeMinResult.valid;

    const typeMBTITagsResult = validateTags(typeMBTITags);
    messages.typeMBTITags = typeMBTITagsResult.message;
    valids.typeMBTITags = typeMBTITagsResult.valid;

    const typeHobbyTagsResult = validateTags(typeHobbyTags);
    messages.typeHobbyTags = typeHobbyTagsResult.message;
    valids.typeHobbyTags = typeHobbyTagsResult.valid;

    const typePersonalityTagsResult = validateTags(typePersonalityTags);
    messages.typePersonalityTags = typePersonalityTagsResult.message;
    valids.typePersonalityTags = typePersonalityTagsResult.valid;

    return { messages, valids };
};

export default signupValidate;

const createValidationResult = (isValid: boolean, successMessage: string, errorMessage: string) => {
    return {
        message: isValid ? successMessage : errorMessage,
        valid: isValid,
    };
};

export const validateNickname = (nickname: string) => {
    if (!nickname) {
        return createValidationResult(false, '', '닉네임을 입력해주세요.');
    } else if (nickname.length < MIN_NICKNAME_LENGTH) {
        return createValidationResult(false, '', `${MIN_NICKNAME_LENGTH}자 이상으로 입력해주세요.`);
    } else if (nickname.length > MAX_NICKNAME_LENGTH) {
        return createValidationResult(false, '', `${MAX_NICKNAME_LENGTH}자 이하로 입력해주세요.`);
    } else {
        return createValidationResult(true, '사용가능한 닉네임 입니다.', '');
    }
};

export const validateLocation = (locationId: number | null) => {
    return createValidationResult(!!locationId, '올바른 지역코드입니다.', '지역을 골라주세요.');
};

export const validateBirthYear = (birthYear: number | null) => {
    return createValidationResult(!!birthYear, '올바른 연도입니다.', '태어난 연도를 알려주세요.');
};

export const validateGender = (gender: string) => {
    return createValidationResult(!!gender, '올바른 성별입니다.', '성별을 선택해주세요.');
};

export const validateBio = (bio: string) => {
    if (!bio) {
        return createValidationResult(false, '', '자기소개를 입력해주세요.');
    } else if (bio.length < MIN_BIO_LENGTH) {
        return createValidationResult(false, '', `${MIN_BIO_LENGTH}자 이상으로 입력해주세요.`);
    } else {
        return createValidationResult(true, '자기소개는 마이페이지에서 볼 수 있어요.', '');
    }
};

export const validateTags = (tags: string[] | string) => {
    return createValidationResult(tags.length > 0, '태그를 통해 이상형을 찾아줘요.', '태그를 선택해주세요.');
};

export const validateAgeRange = (age: number) => {
    return createValidationResult(age >= 0, '입력한 정보로 맞는 사람을 찾아줘요.', '올바른 나이차를 입력해주세요.');
};
