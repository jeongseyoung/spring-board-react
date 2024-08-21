package com.simple.backend.service;

import org.springframework.http.ResponseEntity;

import com.simple.backend.dto.req.board.PostBoardRequestDto;
import com.simple.backend.dto.res.board.PostBoardResponseDto;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
}
