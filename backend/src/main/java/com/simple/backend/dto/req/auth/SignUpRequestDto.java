package com.simple.backend.dto.req.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequestDto {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 20)
    private String password;

    @NotBlank
    private String nickname;

    @NotBlank
    @Pattern(regexp = "^[0-9]{11,13}") // 0~9만 사용, 11~13자리
    private String telNumber;

    @NotBlank
    private String address;
    private String addressDetail;

    @NotNull
    @AssertTrue // True만 받음
    private boolean agreedPersonal; // 동의
}
