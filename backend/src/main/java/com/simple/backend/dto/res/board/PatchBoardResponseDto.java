package com.simple.backend.dto.res.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;

import lombok.Getter;

@Getter
public class PatchBoardResponseDto extends ResponseDto {

    public PatchBoardResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<PatchBoardResponseDto> success() {
        return ResponseEntity.ok().body(new PatchBoardResponseDto());
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_USER, ResponseMessage.NOT_FOUND_USER));
    }

    public static ResponseEntity<ResponseDto> notExistBoard() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_BOARD, ResponseMessage.NOT_FOUND_BOARD));
    }

    public static ResponseEntity<ResponseDto> noPermission() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION));
    }
}
