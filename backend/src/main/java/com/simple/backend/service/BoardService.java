package com.simple.backend.service;

import org.springframework.http.ResponseEntity;

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

public interface BoardService {
        ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email); // 게시물 등록

        ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber); // 게시물 하나 가져오기

        ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email); // 게시물 좋아요 등록

        ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber); // 게시물 좋아요list 반환

        ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber,
                        String email); // 게시물 댓글 등록

        ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber); // 게시물 댓글 반환

        ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);

        ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email); // 게시물 삭제

        ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber,
                        String email); // 게시물 업데이트

        ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList(); // 최근등록된 게시물 반환(list)

        ResponseEntity<? super GetBoardTop3ListResponseDto> getTop3BoardList(); // Top3반환

        ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord_1,
                        String searchWord_2); // 검색결과 반환
}
