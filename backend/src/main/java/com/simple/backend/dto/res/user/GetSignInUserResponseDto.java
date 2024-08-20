package com.simple.backend.dto.res.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.entity.UserEntity;

import lombok.Getter;

@Getter
public class GetSignInUserResponseDto extends ResponseDto {

    private String email;
    private String nickname;
    private String profileImage;

    public GetSignInUserResponseDto(UserEntity userEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = userEntity.getEmail();
        this.nickname = userEntity.getNickname();
        this.profileImage = userEntity.getProfileImage();
    }

    public static ResponseEntity<GetSignInUserResponseDto> succes(UserEntity userEntity) {
        return ResponseEntity.ok().body(new GetSignInUserResponseDto(userEntity));
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_USER, ResponseMessage.NOT_FOUND_USER));
    }

}
