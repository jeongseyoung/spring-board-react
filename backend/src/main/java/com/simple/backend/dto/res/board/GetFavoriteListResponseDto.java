package com.simple.backend.dto.res.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.obj.FavoriteListItem;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.repository.resultSet.GetFavoriteListResultSet;

import lombok.Getter;

@Getter
public class GetFavoriteListResponseDto extends ResponseDto {

    List<FavoriteListItem> favoriteList;

    public GetFavoriteListResponseDto(List<GetFavoriteListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.favoriteList = FavoriteListItem.copyList(resultSets);
    }

    public static ResponseEntity<GetFavoriteListResponseDto> success(List<GetFavoriteListResultSet> resultSets) {
        return ResponseEntity.ok().body(new GetFavoriteListResponseDto(resultSets));
    }

    public static ResponseEntity<ResponseDto> noExistsBoard() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_BOARD, ResponseMessage.NOT_FOUND_BOARD));
    }
}
