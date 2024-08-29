package com.simple.backend.dto.res.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;

public class DeleteBoardResponseDto extends ResponseDto {

    public DeleteBoardResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<DeleteBoardResponseDto> success() {
        return ResponseEntity.ok().body(new DeleteBoardResponseDto());
    }

    public static ResponseEntity<ResponseDto> noExistBoard() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_BOARD, ResponseMessage.NOT_FOUND_BOARD));
    }

    public static ResponseEntity<ResponseDto> noExistUser() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_USER, ResponseMessage.NOT_FOUND_USER));
    }

    public static ResponseEntity<ResponseDto> noPermission() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION));
    }
}
