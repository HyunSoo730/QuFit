package com.cupid.qufit.domain.video.dto;

import com.cupid.qufit.entity.Member;
import com.cupid.qufit.entity.video.VideoRoom;
import com.cupid.qufit.entity.video.VideoRoomHobby;
import com.cupid.qufit.entity.video.VideoRoomParticipant;
import com.cupid.qufit.entity.video.VideoRoomPersonality;
import com.cupid.qufit.entity.video.VideoRoomStatus;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoRoomResponse {

    private Long videoRoomId; // 방 id
    private String videoRoomName; // 방 제목
    private VideoRoomStatus status; //방 상태
    private LocalDateTime createdAt; // 생성일시
    private int maxParticipants; // 최대 인원수
    private int curMCount; // 현재 남자 수
    private int curWCount; // 현재 여자 수
    private List<VideoRoomParticipant> participants; // 참가자
    private List<VideoRoomHobby> videoRoomHobby = new ArrayList<>(); // 방 취미 태그
    private List<VideoRoomPersonality> videoRoomPersonality = new ArrayList<>(); // 방 성격 태그
    private String token; // 방 참가 토큰

    // 참가자의 성격 및 취미 정보를 담을 필드
    private List<String> participantPersonalities = new ArrayList<>();
    private List<String> participantHobbies = new ArrayList<>();

    public static VideoRoomResponse from(VideoRoom videoRoom, String token) {
        return VideoRoomResponse.builder()
                                .videoRoomId(videoRoom.getVideoRoomId())
                                .videoRoomName(videoRoom.getVideoRoomName())
                                .status(videoRoom.getStatus())
                                .createdAt(videoRoom.getCreatedAt())
                                .maxParticipants(videoRoom.getMaxParticipants())
                                .curMCount(videoRoom.getCurMCount())
                                .curWCount(videoRoom.getCurWCount())
                                .participants(videoRoom.getParticipants())
                                .videoRoomHobby(videoRoom.getVideoRoomHobby())
                                .videoRoomPersonality(videoRoom.getVideoRoomPersonality())
                                .token(token)
                                .build();
    }

    public static VideoRoomResponse withDetails(VideoRoom videoRoom) {
        // ! 방 참가자 태그들 가져오는 로직
        List<String> personalities = new ArrayList<>();
        List<String> hobbies = new ArrayList<>();
        for (VideoRoomParticipant participant : videoRoom.getParticipants()) {
            Member member = participant.getMember();
            personalities.addAll(member.getMemberPersonalities().stream()
                                       .map(personality -> personality.getTag().getTagName())
                                       .toList());
            hobbies.addAll(member.getMemberHobbies().stream()
                                 .map(hobby -> hobby.getTag().getTagName())
                                 .toList());
        }

        return VideoRoomResponse.builder()
                                .videoRoomId(videoRoom.getVideoRoomId())
                                .videoRoomName(videoRoom.getVideoRoomName())
                                .status(videoRoom.getStatus())
                                .createdAt(videoRoom.getCreatedAt())
                                .maxParticipants(videoRoom.getMaxParticipants())
                                .curMCount(videoRoom.getCurMCount())
                                .curWCount(videoRoom.getCurWCount())
                                .participants(videoRoom.getParticipants())
                                .videoRoomHobby(videoRoom.getVideoRoomHobby())
                                .videoRoomPersonality(videoRoom.getVideoRoomPersonality())
                                .participantPersonalities(personalities)
                                .participantHobbies(hobbies)
                                .build();
    }
}
