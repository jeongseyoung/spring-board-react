package com.simple.backend.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.simple.backend.dto.req.auth.SignInRequestDto;
import com.simple.backend.dto.req.auth.SignUpRequestDto;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.dto.res.auth.SignInResponseDto;
import com.simple.backend.dto.res.auth.SignUpResponseDto;
import com.simple.backend.entity.UserEntity;
import com.simple.backend.provider.JwtProvider;
import com.simple.backend.repository.UserRepository;
import com.simple.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    ResponseDto responseDto = new ResponseDto(null, null);

    // 가입
    @Override
    public ResponseEntity<? super SignUpResponseDto> SignUp(SignUpRequestDto dto) {
        try {

            if (userRepository.existsByEmail(dto.getEmail()))
                return SignUpResponseDto.Depulicated_EMAIL();

            if (userRepository.existsByNickname(dto.getNickname()))
                return SignUpResponseDto.Depulicated_NICKNAME();

            if (userRepository.existsByTelNumber(dto.getTelNumber()))
                return SignUpResponseDto.Depulicated_TELNUMBER();

            String encodedPassword = passwordEncoder.encode(dto.getPassword());
            dto.setPassword(encodedPassword);

            userRepository.save(new UserEntity(dto));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }

    // 로그인
    @Override
    public ResponseEntity<? super SignInResponseDto> SignIn(SignInRequestDto dto) {
        String token;
        try {
            // if (!userRepository.existsByEmail(dto.getEmail()))
            // return SignInResponseDto.loginFailed();
            UserEntity userEntity = userRepository.findByEmail(dto.getEmail());

            if (userEntity == null || !passwordEncoder.matches(dto.getPassword(), userEntity.getPassword()))
                return SignInResponseDto.loginFailed();

            token = jwtProvider.create(dto.getEmail());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignInResponseDto.loginSuccess(token);
    }

}
