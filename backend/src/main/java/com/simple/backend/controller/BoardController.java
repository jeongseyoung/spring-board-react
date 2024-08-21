package com.simple.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.backend.dto.req.board.PostBoardRequestDto;
import com.simple.backend.dto.res.board.PostBoardResponseDto;
import com.simple.backend.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 게시물 작성
    @PostMapping("/postBoard")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(@RequestBody @Valid PostBoardRequestDto requestBody,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super PostBoardResponseDto> res = boardService.postBoard(requestBody, email);
        return res;
    }
}
