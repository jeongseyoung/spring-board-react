package com.simple.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.simple.backend.entity.CommentEntity;
import com.simple.backend.repository.resultSet.GetCommentListResultSet;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    @Query(value = "SELECT U.nickname AS nickname, U.profile_image AS profile_image, " +
            "C.write_datetime AS write_datetime, C.content AS content " +
            "FROM comment AS C " +
            "INNER JOIN user AS U " +
            "ON C.user_email = U.email " +
            "WHERE C.board_number = ?1 " +
            "ORDER BY write_datetime DESC;", nativeQuery = true)
    List<GetCommentListResultSet> getCommentList(Integer boardNumber);
}
