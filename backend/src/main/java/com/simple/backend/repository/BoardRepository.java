package com.simple.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.simple.backend.entity.BoardEntity;
import com.simple.backend.repository.resultSet.GetBoardResultSet;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    BoardEntity findByBoardNumber(Integer boardNumber);

    boolean existsByBoardNumber(Integer boardNumber);

    @Query(value = "SELECT " +
            "B.board_number as board_number, " +
            "B.title as title, " +
            "B.content as content, " +
            "B.write_datetime as write_datetime, " +
            "B.writer_email as writer_email, " +
            "U.nickname as writerNickname, " +
            "U.profile_image as writerProfile_image " +
            "FROM board as B " +
            "INNER JOIN user as U " +
            "ON B.writer_email = `U`.email " +
            "WHERE board_number = ?1;", nativeQuery = true)
    GetBoardResultSet getBoard(Integer boardNumber);
    // ?1 -> boardNumber에서 첫번재 매개 변수를 넣는다?
    // BoardEntity에는 user테이블의 nickname, profile_image가 없기 때문에
    // GetBoardResultSet(interface)를 따로 만들어서 받아와야 함.
}
