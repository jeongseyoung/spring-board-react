package com.simple.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.backend.dto.req.auth.SignInRequestDto;
import com.simple.backend.dto.req.auth.SignUpRequestDto;
import com.simple.backend.dto.res.auth.SignInResponseDto;
import com.simple.backend.dto.res.auth.SignUpResponseDto;
import com.simple.backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(@RequestBody @Valid SignUpRequestDto requestBody) {
        System.out.println("sign up : " + requestBody.getEmail());
        ResponseEntity<? super SignUpResponseDto> res = authService.SignUp(requestBody);
        return res;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(@RequestBody @Valid SignInRequestDto requestBody) {
        System.out.println("requestBody: " + requestBody.getEmail());
        ResponseEntity<? super SignInResponseDto> res = authService.SignIn(requestBody);
        System.out.println("res : " + res.toString());
        return res;
    }

}
