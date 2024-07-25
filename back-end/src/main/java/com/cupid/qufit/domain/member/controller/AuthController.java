package com.cupid.qufit.domain.member.controller;

import com.cupid.qufit.domain.member.dto.MemberDetails;
import com.cupid.qufit.domain.member.dto.MemberSigninDTO;
import com.cupid.qufit.domain.member.dto.MemberSigninDTO.response;
import com.cupid.qufit.domain.member.dto.MemberSignupDTO;
import com.cupid.qufit.domain.member.service.AuthService;
import com.cupid.qufit.domain.member.service.MemberService;
import com.cupid.qufit.global.exception.ErrorCode;
import com.cupid.qufit.global.exception.exceptionType.MemberException;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/qufit/auth")
@Log4j2
public class AuthController {

    private final AuthService authService;
    private final MemberService memberService;

    /*
     * * 카카오 소셜 로그인
     *
     * @param : accessToken 카카오에서 발급받은 accessToken
     * */

    @GetMapping("/login")
    public ResponseEntity<?> kakaoLogin(@RequestParam("accessToken") String accessToken) {
        MemberDetails memberDetails = authService.kakaoLogin(accessToken);

        if (memberDetails != null) {
            // 유저 정보와 토큰 생성
            Map<String, response> result = memberService.signIn(memberDetails);
            String token = result.keySet().iterator().next();
            log.info("[login token] : " + token);

            // 헤더에 토큰 저장
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            return new ResponseEntity<>(result.get(token), headers, HttpStatus.OK);
        }
        throw new MemberException(ErrorCode.MEMBER_DEFAULT_ERROR);
    }

    /*
     * * 부가정보 입력 후 회원가입 처리
     *
     * TODO
     *  - 유효성 검사 error message 출력
     *  - 닉네임 중복 검사
     *
     * @ param : accessToken 카카오에서 발급받은 accessToken
     * @ body : 회원이 입력한 부가 정보
     * */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestParam("accessToken") String accessToken,
                                    @Valid @RequestBody MemberSignupDTO.request requestDTO) {
        log.info("---------------회원가입 시도-----------");
        MemberSignupDTO.response responseDTO;
        try {
            responseDTO = authService.signup(accessToken, requestDTO);
        } catch (Exception e) {
            log.error("회원 가입 중 오류 발생", e);
            throw new MemberException(ErrorCode.SIGNUP_FAILURE);
        }

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
}
