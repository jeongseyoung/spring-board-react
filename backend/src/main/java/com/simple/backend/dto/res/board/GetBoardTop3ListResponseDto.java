package com.simple.backend.dto.res.board;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.obj.BoardListItem;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.entity.BoardListViewEntity;

import java.util.*;

import org.springframework.http.ResponseEntity;

import lombok.Getter;

@Getter
public class GetBoardTop3ListResponseDto extends ResponseDto {

    private List<BoardListItem> top3List;

    public GetBoardTop3ListResponseDto(List<BoardListViewEntity> boardListViewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.top3List = BoardListItem.getList(boardListViewEntities);
    }

    public static ResponseEntity<GetBoardTop3ListResponseDto> success(List<BoardListViewEntity> boardListViewEntities) {
        return ResponseEntity.ok().body(new GetBoardTop3ListResponseDto(boardListViewEntities));
    }

}
