package com.simple.backend.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.dto.res.user.GetSignInUserResponseDto;
import com.simple.backend.entity.UserEntity;
import com.simple.backend.repository.UserRepository;
import com.simple.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // 내 정보 불러오기
    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {

        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null)
                return GetSignInUserResponseDto.notExistUser();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInUserResponseDto.succes(userEntity);
    }

}
