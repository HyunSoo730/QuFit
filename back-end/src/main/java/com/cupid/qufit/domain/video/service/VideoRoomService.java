package com.cupid.qufit.domain.video.service;

import com.cupid.qufit.domain.video.dto.VideoRoomDTO;
import java.util.Map;
import org.springframework.data.domain.Pageable;

public interface VideoRoomService {

    VideoRoomDTO.BasicResponse createVideoRoom(VideoRoomDTO.Request videoRoomRequest);

    String joinVideoRoom(Long videoRoomId, Long memberId);

    VideoRoomDTO.BasicResponse updateVideoRoom(Long videoRoomId, VideoRoomDTO.Request videoRoomRequest);

    void deleteVideoRoom(Long videoRoomId);

    void leaveVideoRoom(Long videoRoomId, Long memberId);

    VideoRoomDTO.DetailResponse getVideoRoomDetail(Long videoRoomId);

    Map<String, Object> getVideoRoomList(Pageable pageable);
}
