package com.simple.backend.dto.req.board;

import lombok.Getter;

@Getter
public class GetCommentListRequestDto {
    private Integer boardNumber;
    private String email;
}
