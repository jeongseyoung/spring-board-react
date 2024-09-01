package com.simple.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.simple.backend.entity.SearchLogEntity;
import com.simple.backend.repository.resultSet.GetPopularListResultSet;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> { // integer는 pk타입(@Id)
    @Query(value = "SELECT search_word as searchWord, count(search_word) AS count " +
            "FROM search_log " +
            "WHERE relation IS FALSE " +
            "GROUP BY search_word " +
            "ORDER BY count DESC " +
            "LIMIT 15 ", nativeQuery = true)
    List<GetPopularListResultSet> getPopularList();
}
