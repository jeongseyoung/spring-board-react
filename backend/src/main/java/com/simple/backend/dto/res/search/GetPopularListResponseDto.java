package com.simple.backend.dto.res.search;

import java.util.*;

import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.repository.resultSet.GetPopularListResultSet;

import lombok.Getter;

@Getter
public class GetPopularListResponseDto extends ResponseDto {
    private List<String> popularWordList;

    public GetPopularListResponseDto(List<GetPopularListResultSet> resultSet) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        // List<String> list = new ArrayList<>();
        for (GetPopularListResultSet c : resultSet) {
            this.popularWordList.add(c.getSearchWord()); // "popularWordList": null 왜?
        }
        // List<String> list = new ArrayList<>();
        // for (GetPopularListResultSet g : resultSet) {
        // popularWordList.add(g.getSearchWord());
        // }
        // this.popularWordList = list; //"popularWordList": []
    }

    public static ResponseEntity<GetPopularListResponseDto> success(
            List<GetPopularListResultSet> resultSet) {
        return ResponseEntity.ok().body(new GetPopularListResponseDto(resultSet));
    }

}
