package com.simple.backend.dto.res.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;

import lombok.Getter;

@Getter
public class SignUpResponseDto extends ResponseDto {
    public SignUpResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    // ResponseEntity SUCCESS
    public static ResponseEntity<SignUpResponseDto> success() {
        return ResponseEntity.ok().body(new SignUpResponseDto());
    }

    // ResponseEntity Duplicated EMAIL
    public static ResponseEntity<ResponseDto> Depulicated_EMAIL() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(ResponseCode.DUPLICATED_EMAIL, ResponseMessage.DUPLICATED_EMAIL));
    }

    // ResponseEntity Duplicated NICKNAME
    public static ResponseEntity<ResponseDto> Depulicated_NICKNAME() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(ResponseCode.DUPLICATED_NICKNAME, ResponseMessage.DUPLICATED_NICKNAME));
    }

    // ResponseEntity Duplicated TELNUMBER
    public static ResponseEntity<ResponseDto> Depulicated_TELNUMBER() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(ResponseCode.DUPLICATED_TEL_NUMBER, ResponseMessage.DUPLICATED_TEL_NUMBER));
    }
}
