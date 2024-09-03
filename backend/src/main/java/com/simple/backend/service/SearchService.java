package com.simple.backend.service;

import org.springframework.http.ResponseEntity;

import com.simple.backend.dto.res.search.GetPopularListResponseDto;
import com.simple.backend.dto.res.search.GetRelationListResponseDto;

public interface SearchService {
    ResponseEntity<? super GetPopularListResponseDto> getPopularWordList();

    ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord);
}
