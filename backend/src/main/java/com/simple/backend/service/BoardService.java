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
import com.simple.backend.dto.res.board.IncreaseViewCountResponseDto;
import com.simple.backend.dto.res.board.PatchBoardResponseDto;
import com.simple.backend.dto.res.board.PostBoardResponseDto;
import com.simple.backend.dto.res.board.PostCommentResponseDto;
import com.simple.backend.dto.res.board.PutFavoriteResponseDto;

public interface BoardService {
        ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);

        ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);

        ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

        ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);

        ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber,
                        String email);

        ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);

        ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);

        ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);

        ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber,
                        String email);

        ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();

        ResponseEntity<? super GetBoardTop3ListResponseDto> getTop3BoardList();
}
