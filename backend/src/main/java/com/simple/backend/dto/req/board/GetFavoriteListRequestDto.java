package com.simple.backend.dto.req.board;

import lombok.Getter;

@Getter
public class GetFavoriteListRequestDto {
    private Integer boardNumber;
    private String email;
}
