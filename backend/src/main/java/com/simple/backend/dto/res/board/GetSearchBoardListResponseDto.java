package com.simple.backend.dto.res.board;

import java.util.*;

import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.obj.BoardListItem;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.entity.BoardListViewEntity;

import lombok.Getter;

@Getter // 검색결과 반환(list)
public class GetSearchBoardListResponseDto extends ResponseDto {

    List<BoardListItem> searchList; // = const { searchList } = responseBody as GetSearchBoardListResponseDto;

    public GetSearchBoardListResponseDto(List<BoardListViewEntity> boardListViewEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.searchList = BoardListItem.getList(boardListViewEntity);
    }

    public static ResponseEntity<GetSearchBoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntity) {
        return ResponseEntity.ok().body(new GetSearchBoardListResponseDto(boardListViewEntity));
    }
}
