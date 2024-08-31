package com.simple.backend.dto.res.board;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.obj.BoardListItem;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetLatestBoardListResponseDto extends ResponseDto {

    private List<BoardListItem> latestList;

    public GetLatestBoardListResponseDto(List<BoardListViewEntity> boardListViewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestList = BoardListItem.getList(boardListViewEntities);
    }

    public static ResponseEntity<GetLatestBoardListResponseDto> success(
            List<BoardListViewEntity> boardListViewEntities) {
        return ResponseEntity.ok().body(new GetLatestBoardListResponseDto(boardListViewEntities));
    }

}
