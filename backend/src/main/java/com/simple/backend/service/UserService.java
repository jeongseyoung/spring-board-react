package com.simple.backend.service;

import org.springframework.http.ResponseEntity;

import com.simple.backend.dto.res.user.GetSignInUserResponseDto;

public interface UserService {

    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);

}
