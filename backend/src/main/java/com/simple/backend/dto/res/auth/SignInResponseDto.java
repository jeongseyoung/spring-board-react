package com.simple.backend.dto.res.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;

import lombok.Getter;

@Getter
public class SignInResponseDto extends ResponseDto {

    private String token;
    private int expirationTime;

    public SignInResponseDto(String token) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token = token;
        this.expirationTime = 3600; // 한시간
    }

    public static ResponseEntity<SignInResponseDto> loginSuccess(String token) {
        return ResponseEntity.ok().body(new SignInResponseDto(token));
    }

    public static ResponseEntity<ResponseDto> loginFailed() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ResponseDto(ResponseCode.LOGIN_FAILED, ResponseMessage.LOGIN_FAILED));
    }

    // public ResponseEntity<ResponseDto> user_not_found() {
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new
    // ResponseDto(ResponseCode.LOGIN_FAILED, ResponseMessage.LOGIN_FAILED))
    // }

    // public ResponseEntity<ResponseDto> password_not_correct() {
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new
    // ResponseDto(ResponseCode.LOGIN_FAILED, ResponseMessage.LOGIN_FAILED))
    // }
}
