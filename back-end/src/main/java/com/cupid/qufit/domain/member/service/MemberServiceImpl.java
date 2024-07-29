package com.cupid.qufit.domain.member.service;

import static com.cupid.qufit.domain.member.util.MemberBirthDateUtil.convertToLocalDate;

import com.cupid.qufit.domain.member.dto.MemberDetails;
import com.cupid.qufit.domain.member.dto.MemberInfoDTO;
import com.cupid.qufit.domain.member.dto.MemberSigninDTO;
import com.cupid.qufit.domain.member.repository.profiles.MemberRepository;
import com.cupid.qufit.domain.member.repository.profiles.TypeProfilesRepository;
import com.cupid.qufit.domain.member.repository.tag.LocationRepository;
import com.cupid.qufit.domain.member.repository.tag.TagRepository;
import com.cupid.qufit.entity.Location;
import com.cupid.qufit.entity.Member;
import com.cupid.qufit.entity.MemberHobby;
import com.cupid.qufit.entity.MemberPersonality;
import com.cupid.qufit.entity.MemberStatus;
import com.cupid.qufit.entity.Tag;
import com.cupid.qufit.entity.TypeHobby;
import com.cupid.qufit.entity.TypeMBTI;
import com.cupid.qufit.entity.TypePersonality;
import com.cupid.qufit.entity.TypeProfiles;
import com.cupid.qufit.global.exception.ErrorCode;
import com.cupid.qufit.global.exception.exceptionType.MemberException;
import com.cupid.qufit.global.exception.exceptionType.TagException;
import com.cupid.qufit.global.redis.service.RedisRefreshTokenService;
import com.cupid.qufit.global.security.util.JWTUtil;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional
public class MemberServiceImpl implements MemberService {

    private final LocationRepository locationRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final TypeProfilesRepository typeProfilesRepository;
    private final JWTUtil jwtUtil;
    private final RedisRefreshTokenService redisRefreshTokenService;

    /*
     * * 회원 프로필 (지역, mbti, 취미, 성격) 저장
     * */
    @Override
    public void saveMemberProfiles(Member member, MemberInfoDTO.Request requestDTO) {
        // location 저장
        this.saveMemberLocation(member, requestDTO.getLocationId());

        // mbti 저장
        this.saveMemberMBTI(member, requestDTO.getMemberMBTITagId());

        // hobby 저장
        List<Long> memberHobbyIds = requestDTO.getMemberHobbyTagIds();
        this.saveMemberHobbies(member, memberHobbyIds);

        // Personality 저장
        List<Long> memberPersonalityIds = requestDTO.getMemberHobbyTagIds();
        this.saveMemberPersonalities(member, memberPersonalityIds);

    }

    /*
     * * 이상형 프로필 생성, 나이차 저장
     * */
    @Override
    public TypeProfiles createTypeProfiles(Member member, MemberInfoDTO.Request requestDTO) {
        return TypeProfiles.builder()
                           .member(member)
                           .typeAgeMax(requestDTO.getTypeAgeMax())
                           .typeAgeMin(requestDTO.getTypeAgeMin())
                           .build();
    }

    /*
     * * 이상형 프로필 (지역, mbti, 취미, 성격) 저장
     * */
    @Override
    public void saveTypeProfilesInfo(TypeProfiles typeProfiles, MemberInfoDTO.Request requestDTO) {
        // mbti 저장
        List<Long> typeMBTIIds = requestDTO.getTypeMBTITagIds();
        this.saveTypeMBTI(typeProfiles, typeMBTIIds);

        // hobby 저장
        List<Long> typeHobbyIds = requestDTO.getMemberHobbyTagIds();
        this.saveTypeHobbies(typeProfiles, typeHobbyIds);

        // Personality 저장
        List<Long> typePersonalityIds = requestDTO.getMemberHobbyTagIds();
        this.saveTypePersonalities(typeProfiles, typePersonalityIds);

    }

    /*
     * * 로그인 성공 시 jwt 발급
     *
     * @param : 로그인 성공 처리된 MemberDetails
     * - 카카오 로그인된 회원 email이 db에 존재하며 승인된 회원일 경우 로그인 처리
     * */
    @Override
    public Map<String, MemberSigninDTO.Response> signIn(MemberDetails memberDetails) {
        String accessToken = jwtUtil.generateToken(memberDetails.getClaims(), "access");
        String refreshToken = jwtUtil.generateToken(memberDetails.getClaims(), "refresh");
        redisRefreshTokenService.saveRedisData(memberDetails.getId(), refreshToken,
                                               accessToken); // refreshToken redis에 저장

        Member member = memberRepository.findById(memberDetails.getId())
                                        .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

        MemberSigninDTO.Response responseDTO = MemberSigninDTO.Response.builder()
                                                                       .email(member.getEmail())
                                                                       .nickname(member.getNickname())
                                                                       .profileImage(member.getProfileImage())
                                                                       .gender(member.getGender())
                                                                       .build();

        Map<String, MemberSigninDTO.Response> result = new HashMap<>();
        result.put(accessToken, responseDTO);
        return result;
    }

    /*
     * * 회원 정보 조회
     * */
    @Override
    public MemberInfoDTO.Response getMemberInfo(Long memberId) {
        Member member = memberRepository.findById(memberId)
                                        .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

        TypeProfiles typeProfiles = typeProfilesRepository.findByMemberId(memberId)
                                                          .orElseThrow(() -> new MemberException(
                                                                  ErrorCode.TYPE_PROFILES_NOT_FOUND));
        return MemberInfoDTO.Response.of(member, typeProfiles);
    }

    /*
     * * 회원 정보 수정
     *
     * @param 회원가입 요청 DTO 와 동일
     *
     * */
    @Override
    public MemberInfoDTO.Response updateMemberInfo(MemberInfoDTO.Request request, Long memberId) {
        Member member = memberRepository.findById(memberId)
                                        .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

        // 기존 회원 프로필 수정
        member.updateNickname(request.getNickname());
        member.updateBirthDate(convertToLocalDate(request.getBirthYear()));
        member.updateGender(request.getGender().charAt(0));
        member.updateBio(request.getBio());

        // 회원 프로필 정보(지역, mbti, 취미, 성격) 수정
        saveMemberProfiles(member, request);

        // 이상형 프로필 수정
        TypeProfiles typeProfiles = typeProfilesRepository.findByMemberId(memberId)
                                                          .orElseThrow(() -> new MemberException(
                                                                  ErrorCode.TYPE_PROFILES_NOT_FOUND));

        typeProfiles.updateTyeAgeMax(request.getTypeAgeMax());
        typeProfiles.updateTypeAgeMin(request.getTypeAgeMin());

        // 이상형 프로필 정보(mbti, 취미, 성격) 수정
        saveTypeProfilesInfo(typeProfiles, request);

        Member updatedMember = memberRepository.save(member);
        TypeProfiles updatedType = typeProfilesRepository.save(typeProfiles);

        return MemberInfoDTO.Response.of(updatedMember, updatedType);
    }

    /*
     * * 회원 탈퇴 처리
     * */
    @Override
    public Member deleteService(Long currentMemberId) {
        Member member = memberRepository.findById(currentMemberId)
                                        .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

        // 회원 상태 확인
        if (member.getStatus() == MemberStatus.WITHDRAWN) {
            throw new MemberException(ErrorCode.MEMBER_ALREADY_WITHDRAWN);
        }
        member.updateStatus(MemberStatus.WITHDRAWN);

        return memberRepository.save(member);
    }

    private void saveMemberLocation(Member member, Long locationId) {
        Location location = locationRepository.findById(locationId)
                                              .orElseThrow(() -> new TagException(ErrorCode.LOCATION_NOT_FOUND));
        member.updateLocation(location);
    }

    private void saveMemberMBTI(Member member, Long tagId) {
        if (tagId != null) {
            Tag mbti = tagRepository.findById(tagId)
                                    .orElseThrow(() -> new TagException(ErrorCode.TAG_NOT_FOUND));
            member.updateMBTI(mbti);
        }
    }

    private void saveMemberHobbies(Member member, List<Long> memberHobbyIds) {
        if(!member.getMemberHobbies().isEmpty()) member.getMemberHobbies().clear();

        if (!memberHobbyIds.isEmpty()) {
            memberHobbyIds.forEach(tagId -> {
                MemberHobby memberHobby = MemberHobby.builder()
                                                     .tag(tagRepository.findById(tagId)
                                                                       .orElseThrow(() -> new TagException(
                                                                               ErrorCode.TAG_NOT_FOUND)))
                                                     .build();
                member.addMemberHobbies(memberHobby);
            });
        }
    }

    private void saveMemberPersonalities(Member member, List<Long> memberPersonalityIds) {
        if(!member.getMemberPersonalities().isEmpty()) member.getMemberPersonalities().clear();

        if (!memberPersonalityIds.isEmpty()) {
            memberPersonalityIds.forEach(tagId -> {
                MemberPersonality memberPersonality = MemberPersonality.builder()
                                                                       .tag(tagRepository.findById(tagId).orElseThrow(
                                                                               () -> new TagException(
                                                                                       ErrorCode.TAG_NOT_FOUND)))
                                                                       .build();
                member.addMemberPersonalities(memberPersonality);
            });
        }
    }

    private void saveTypeMBTI(TypeProfiles typeProfiles, List<Long> typeMBTIIds) {
        if(!typeProfiles.getTypeMBTIs().isEmpty()) typeProfiles.getTypeMBTIs().clear();

        if (typeMBTIIds != null && !typeMBTIIds.isEmpty()) {
            typeMBTIIds.forEach(tagId -> {
                TypeMBTI typeMBTI = TypeMBTI.builder()
                                            .tag(tagRepository.findById(tagId).orElseThrow(
                                                    () -> new TagException(ErrorCode.TAG_NOT_FOUND)))
                                            .build();
                typeProfiles.addtypeMBTIs(typeMBTI);
            });
        }
    }

    private void saveTypeHobbies(TypeProfiles typeProfiles, List<Long> typeHobbyIds) {
        if(!typeProfiles.getTypeHobbies().isEmpty()) typeProfiles.getTypeHobbies().clear();

        if (!typeHobbyIds.isEmpty()) {
            typeHobbyIds.forEach(tagId -> {
                TypeHobby typeHobby = TypeHobby.builder()
                                               .tag(tagRepository.findById(tagId).orElseThrow(
                                                       () -> new TagException(ErrorCode.TAG_NOT_FOUND)))
                                               .build();
                typeProfiles.addTypeHobbies(typeHobby);
            });
        }
    }

    private void saveTypePersonalities(TypeProfiles typeProfiles, List<Long> typePersonalityIds) {
        if(!typeProfiles.getTypePersonalities().isEmpty()) typeProfiles.getTypePersonalities().clear();

        if (!typePersonalityIds.isEmpty()) {
            typePersonalityIds.forEach(tagId -> {
                TypePersonality typePersonality = TypePersonality.builder()
                                                                 .tag(tagRepository.findById(tagId).orElseThrow(
                                                                         () -> new TagException(
                                                                                 ErrorCode.TAG_NOT_FOUND)))
                                                                 .build();
                typeProfiles.addTypePersonalities(typePersonality);
            });
        }
    }
}
