package com.simple.backend.dto.res.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;

public class IncreaseViewCountResponseDto extends ResponseDto {

    public IncreaseViewCountResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<IncreaseViewCountResponseDto> success() {
        return ResponseEntity.ok().body(new IncreaseViewCountResponseDto());
    }

    public static ResponseEntity<ResponseDto> noExistBoard() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_BOARD, ResponseMessage.NOT_FOUND_BOARD));
    }
}
