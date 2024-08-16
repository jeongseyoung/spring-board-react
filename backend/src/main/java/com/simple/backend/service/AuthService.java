package com.simple.backend.service;

import org.springframework.http.ResponseEntity;

import com.simple.backend.dto.req.auth.SignInRequestDto;
import com.simple.backend.dto.req.auth.SignUpRequestDto;
import com.simple.backend.dto.res.auth.SignInResponseDto;
import com.simple.backend.dto.res.auth.SignUpResponseDto;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> SignUp(SignUpRequestDto dto);

    ResponseEntity<? super SignInResponseDto> SignIn(SignInRequestDto dto);
}
