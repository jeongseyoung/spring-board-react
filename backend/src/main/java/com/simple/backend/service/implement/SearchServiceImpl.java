package com.simple.backend.service.implement;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.dto.res.search.GetPopularListResponseDto;
import com.simple.backend.repository.SearchLogRepository;
import com.simple.backend.repository.resultSet.GetPopularListResultSet;
import com.simple.backend.service.SearchService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final SearchLogRepository searchLogRepository;

    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularWordList() {
        List<GetPopularListResultSet> getPopularResultSet = new ArrayList<>();
        try {
            getPopularResultSet = searchLogRepository.getPopularList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetPopularListResponseDto.success(getPopularResultSet);
    }

}
