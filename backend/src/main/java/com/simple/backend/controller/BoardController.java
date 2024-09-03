package com.simple.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.backend.dto.req.board.PatchBoardRequestDto;
import com.simple.backend.dto.req.board.PostBoardRequestDto;
import com.simple.backend.dto.req.board.PostCommentRequestDto;
import com.simple.backend.dto.res.board.DeleteBoardResponseDto;
import com.simple.backend.dto.res.board.GetBoardResponseDto;
import com.simple.backend.dto.res.board.GetBoardTop3ListResponseDto;
import com.simple.backend.dto.res.board.GetCommentListResponseDto;
import com.simple.backend.dto.res.board.GetFavoriteListResponseDto;
import com.simple.backend.dto.res.board.GetLatestBoardListResponseDto;
import com.simple.backend.dto.res.board.GetSearchBoardListResponseDto;
import com.simple.backend.dto.res.board.IncreaseViewCountResponseDto;
import com.simple.backend.dto.res.board.PatchBoardResponseDto;
import com.simple.backend.dto.res.board.PostBoardResponseDto;
import com.simple.backend.dto.res.board.PostCommentResponseDto;
import com.simple.backend.dto.res.board.PutFavoriteResponseDto;
import com.simple.backend.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 게시물 하나 가져오기
    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(@PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super GetBoardResponseDto> res = boardService.getBoard(boardNumber);
        System.out.println(res.getStatusCode());
        return res;
    }

    // 게시물 작성
    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(@RequestBody @Valid PostBoardRequestDto requestBody,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super PostBoardResponseDto> res = boardService.postBoard(requestBody, email);
        return res;
    }

    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(@PathVariable("boardNumber") Integer boardNumber,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super PutFavoriteResponseDto> res = boardService.putFavorite(boardNumber, email);
        return res;
    }

    @GetMapping("{boardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(
            @PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super GetFavoriteListResponseDto> res = boardService.getFavoriteList(boardNumber);
        System.out.println(res.getBody().toString());
        return res;
    }

    @PostMapping("/{boardNumber}/comment")
    public ResponseEntity<? super PostCommentResponseDto> postComment(
            @RequestBody @Valid PostCommentRequestDto requestBody,
            @PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email) {
        ResponseEntity<? super PostCommentResponseDto> res = boardService.postComment(requestBody, boardNumber, email);
        return res;
    }

    @GetMapping("/{boardNumber}/comment-list")
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(
            @PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super GetCommentListResponseDto> res = boardService.getCommentList(boardNumber);
        return res;
    }

    // @PatchMapping("{boardNumber}/increase-view-count")
    @GetMapping("{boardNumber}/increase-view-count")
    public ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(
            @PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super IncreaseViewCountResponseDto> res = boardService.increaseViewCount(boardNumber);
        return res;
    }

    @DeleteMapping("/{boardNumber}")
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(@PathVariable("boardNumber") Integer boardNumber,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super DeleteBoardResponseDto> res = boardService.deleteBoard(boardNumber, email);
        return res;
    }

    @PatchMapping("/{boardNumber}")
    public ResponseEntity<? super PatchBoardResponseDto> patchBoard(@RequestBody @Valid PatchBoardRequestDto dto,
            @PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email) {
        ResponseEntity<? super PatchBoardResponseDto> res = boardService.patchBoard(dto, boardNumber, email);
        return res;
    }

    @GetMapping("/latest-list")
    public ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList() {
        ResponseEntity<? super GetLatestBoardListResponseDto> res = boardService.getLatestBoardList();
        return res;
    }

    @GetMapping("/top-3")
    public ResponseEntity<? super GetBoardTop3ListResponseDto> getTop3BoardList() {
        ResponseEntity<? super GetBoardTop3ListResponseDto> res = boardService.getTop3BoardList();
        return res;
    }

    @GetMapping(value = { "/search-list/{searchWord}", "/search-list/{searchWord}/{preSearchWord}" })
    public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(
            @PathVariable("searchWord") String searchWord,
            @PathVariable(value = "preSearchWord", required = false) String preSearchWord) {
        System.out.println("1: " + searchWord + " 2: " + preSearchWord);
        ResponseEntity<? super GetSearchBoardListResponseDto> res = boardService.getSearchBoardList(searchWord,
                preSearchWord);
        return res;
    }
}
