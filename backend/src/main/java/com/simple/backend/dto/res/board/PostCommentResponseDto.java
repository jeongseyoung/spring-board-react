package com.simple.backend.dto.res.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;

import lombok.Getter;

@Getter
public class PostCommentResponseDto extends ResponseDto {

    public PostCommentResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<PostCommentResponseDto> succes() {
        return ResponseEntity.ok().body(new PostCommentResponseDto());
    }

    public static ResponseEntity<ResponseDto> noExistBoard() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_BOARD, ResponseMessage.NOT_FOUND_BOARD));
    }

    public static ResponseEntity<ResponseDto> noExistUser() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_USER, ResponseMessage.NOT_FOUND_USER));
    }
}
