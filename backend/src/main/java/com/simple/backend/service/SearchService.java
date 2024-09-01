package com.simple.backend.service;

import org.springframework.http.ResponseEntity;

import com.simple.backend.dto.res.search.GetPopularListResponseDto;

public interface SearchService {
    ResponseEntity<? super GetPopularListResponseDto> getPopularWordList();
}
