package com.simple.backend.dto.res.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.repository.resultSet.GetRelationListResultSet;

import lombok.Getter;

@Getter // 연관 검색어 리스트 반환
public class GetRelationListResponseDto extends ResponseDto {

    private List<String> relativeWordList = new ArrayList<>();

    public GetRelationListResponseDto(List<GetRelationListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        // this.relativeWordList = new ArrayList<>();
        for (GetRelationListResultSet g : resultSets) {
            System.out.println("g " + g.getSearchWord());
            this.relativeWordList.add(g.getSearchWord());
        }
    }

    public static ResponseEntity<GetRelationListResponseDto> success(List<GetRelationListResultSet> resultSets) {
        return ResponseEntity.ok().body(new GetRelationListResponseDto(resultSets));
    }
}
