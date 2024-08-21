package com.simple.backend.dto.res.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;

public class PostBoardResponseDto extends ResponseDto {

    public PostBoardResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<PostBoardResponseDto> success() {
        return ResponseEntity.ok().body(new PostBoardResponseDto());
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_USER, ResponseMessage.NOT_FOUND_USER));
    }
}
