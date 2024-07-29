package com.cupid.qufit.domain.video.dto;

import com.cupid.qufit.entity.video.VideoRoom;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoRoomRequest {

    private Long videoRoomId; // 방 아이디
    @NotEmpty
    private String videoRoomName; // 방 제목
    @Size(min = 1, max = 4, message = "인원수는 1:1~4:4 입니다")
    private int maxParticipants; // 최대 인원수
    //    private List<Tag> tags; // 태그들
    private Long participantId; // 참가자 아이디

    public static VideoRoom to(VideoRoomRequest videoRoomRequest) {
        return VideoRoom.builder()
                        .videoRoomName(videoRoomRequest.getVideoRoomName())
                        .createdAt(LocalDateTime.now())
                        .maxParticipants(videoRoomRequest.getMaxParticipants())
                        .build();
    }
}