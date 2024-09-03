package com.simple.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.backend.dto.res.search.GetPopularListResponseDto;
import com.simple.backend.dto.res.search.GetRelationListResponseDto;
import com.simple.backend.service.SearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/search-list")
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {
        ResponseEntity<? super GetPopularListResponseDto> res = searchService.getPopularWordList();
        System.out.println("res : " + res);
        return res;
    }

    @GetMapping("/{searchWord}/relation-list")
    public ResponseEntity<? super GetRelationListResponseDto> getRelationList(
            @PathVariable("searchWord") String searchWord) {
        ResponseEntity<? super GetRelationListResponseDto> res = searchService.getRelationList(searchWord);
        return res;
    }
}
